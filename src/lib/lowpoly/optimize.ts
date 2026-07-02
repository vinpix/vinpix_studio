/**
 * In-browser GLB decimation for the /team 3D Gen low-poly flow.
 *
 * Same pipeline as the CLI recipe verified on Tripo models (2026-07-02):
 *   weld → meshopt simplify (QEM edge-collapse, 2 passes) → resize textures.
 * ~1M vertices / 11MB in → ~2k vertices / ~350KB out. Pure WASM+canvas, no
 * server round-trip; runs inside a Web Worker (see worker.ts).
 */
import { Document, WebIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { weld, simplify, prune } from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptSimplifier } from "meshoptimizer";

export interface LowpolyResult {
  glb: Uint8Array;
  vertices: number;
  triangles: number;
}

const TARGET_TRIANGLES = 1500;
const MAX_TEXTURE_SIZE = 1024;
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

async function resizeTextures(doc: Document): Promise<void> {
  for (const tex of doc.getRoot().listTextures()) {
    const image = tex.getImage();
    if (!image) continue;
    const bitmap = await createImageBitmap(
      new Blob([new Uint8Array(image)], { type: tex.getMimeType() })
    );
    const scale = MAX_TEXTURE_SIZE / Math.max(bitmap.width, bitmap.height);
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

export async function optimizeGlb(buf: ArrayBuffer): Promise<LowpolyResult> {
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
  if (source.triangles > TARGET_TRIANGLES * 2) {
    // pass 1 aims at the target; pass 2 shaves the UV-seam floor the QEM
    // simplifier leaves behind (same two-step as the CLI run)
    await doc.transform(
      weld(),
      simplify({
        simplifier: MeshoptSimplifier,
        ratio: Math.min(1, TARGET_TRIANGLES / source.triangles),
        error: 1,
      }),
      simplify({ simplifier: MeshoptSimplifier, ratio: 0.85, error: 1 }),
      prune()
    );
  }

  await resizeTextures(doc);

  const glb = await io.writeBinary(doc);
  const { vertices, triangles } = countGeometry(doc);
  return { glb, vertices, triangles };
}
