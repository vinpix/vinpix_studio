/**
 * In-browser GLB decimation for the /team 3D Gen compress flow.
 *
 * Same pipeline as the CLI recipe verified on Tripo models (2026-07-02):
 *   weld → meshopt simplify (QEM edge-collapse, up to 2 passes) → resize
 *   textures. Pure WASM+canvas, no server round-trip; runs inside a Web
 *   Worker (see lowpoly.worker.ts).
 *
 * `targetVertices` picks the quality level (3k / 5k / 10k …). Levels ≥8k keep
 * 2048px textures so the result stays smooth; below that 1024px is plenty.
 */
import { Document, WebIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { weld, simplify, prune } from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptSimplifier } from "meshoptimizer";

export interface LowpolyOptions {
  targetVertices: number;
}

export interface LowpolyResult {
  glb: Uint8Array;
  vertices: number;
  triangles: number;
}

export const DEFAULT_TARGET_VERTICES = 3000;
/** verts/tris drifts with scale (UV seams dominate small meshes, closed-mesh
 *  V≈T/2 takes over on big ones) — so pass 1 aims ~15% ABOVE the vertex
 *  budget in triangles and pass 2 corrects any overshoot precisely */
const PASS1_TRIS_FACTOR = 1.15;
const HQ_TEXTURE_THRESHOLD = 8000;
const JPEG_QUALITY = 0.85;

function countGeometry(doc: Document): { vertices: number; triangles: number } {
  let vertices = 0;
  let triangles = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const pos = prim.getAttribute("POSITION");
      if (!pos) continue;
      vertices += pos.getCount();
      const indices = prim.getIndices();
      triangles += Math.floor((indices ? indices.getCount() : pos.getCount()) / 3);
    }
  }
  return { vertices, triangles };
}

async function resizeTextures(doc: Document, maxSize: number): Promise<void> {
  for (const tex of doc.getRoot().listTextures()) {
    const image = tex.getImage();
    if (!image) continue;
    const bitmap = await createImageBitmap(
      new Blob([new Uint8Array(image)], { type: tex.getMimeType() })
    );
    const scale = maxSize / Math.max(bitmap.width, bitmap.height);
    if (scale >= 1) {
      bitmap.close();
      continue;
    }
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      continue;
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await canvas.convertToBlob({
      type: "image/jpeg",
      quality: JPEG_QUALITY,
    });
    tex
      .setImage(new Uint8Array(await blob.arrayBuffer()))
      .setMimeType("image/jpeg");
  }
}

export async function optimizeGlb(
  buf: ArrayBuffer,
  options: LowpolyOptions
): Promise<LowpolyResult> {
  const targetVertices = Math.max(500, options.targetVertices);
  const targetTriangles = Math.round(targetVertices * PASS1_TRIS_FACTOR);

  await MeshoptDecoder.ready;
  await MeshoptSimplifier.ready;

  const io = new WebIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({ "meshopt.decoder": MeshoptDecoder });
  const doc = await io.readBinary(new Uint8Array(buf));

  // geometry was decoded on read — drop the extension so the output GLB opens
  // anywhere without a meshopt decoder
  for (const ext of doc.getRoot().listExtensionsUsed()) {
    if (ext.extensionName === "EXT_meshopt_compression") ext.dispose();
  }

  const source = countGeometry(doc);
  if (source.triangles > targetTriangles * 1.2) {
    await doc.transform(
      weld(),
      simplify({
        simplifier: MeshoptSimplifier,
        ratio: Math.min(1, targetTriangles / source.triangles),
        error: 1,
      })
    );
    // one corrective pass if we overshot the vertex budget by more than ~8%
    const after = countGeometry(doc);
    if (after.vertices > targetVertices * 1.08) {
      await doc.transform(
        simplify({
          simplifier: MeshoptSimplifier,
          ratio: Math.min(1, targetVertices / after.vertices),
          error: 1,
        })
      );
    }
    await doc.transform(prune());
  }

  await resizeTextures(
    doc,
    targetVertices >= HQ_TEXTURE_THRESHOLD ? 2048 : 1024
  );

  const glb = await io.writeBinary(doc);
  const { vertices, triangles } = countGeometry(doc);
  return { glb, vertices, triangles };
}
