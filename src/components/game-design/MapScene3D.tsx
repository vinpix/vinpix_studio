"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { setShadowResolution } from "@/features/game-design/shadows";
import { loadGltfTemplate } from "@/features/game-design/gltfCache";
import { entryOf, objectFootprint, objectLayer, worldPositionOf } from "@/features/game-design/mapDoc";
import { CELL_SIZE, layerTypeOf, type LayerVisibility, type MapDoc, type MapObject } from "@/features/game-design/types";
import { ENV_OPTIONS, type ViewSettings } from "@/features/game-design/viewSettings";
import DuckPlayer, { type PlayHud } from "./DuckPlayer";

export type CameraPreset = "orbit" | "top";

export type SceneDiag = {
  gpu: string;
  shadowMapEnabled: boolean;
  shadowMapType: number;
  lightCastShadow: boolean;
  shadowMapSize: number;
  shadowMapAllocated: boolean;
  casters: number;
  receivers: number;
  meshes: number;
  envSet: boolean;
  pixelRatio: number;
};

type Props = {
  doc: MapDoc;
  selectedIds: string[];
  visibility: LayerVisibility;
  cameraPreset: CameraPreset;
  fitToken: number;
  settings: ViewSettings;
  onSelect: (id: string | null, additive: boolean) => void;
  onDiag?: (d: SceneDiag) => void;
  /** Play mode: drop the duck in, hand the camera to it, freeze editing. */
  playing?: boolean;
  onHud?: (hud: PlayHud) => void;
};

const noSelect = () => {};

function mapCenter(doc: MapDoc): THREE.Vector3 {
  return new THREE.Vector3(((doc.width - 1) / 2) * CELL_SIZE, 0, ((doc.height - 1) / 2) * CELL_SIZE);
}

function Controls({ doc, preset, fitToken }: { doc: MapDoc; preset: CameraPreset; fitToken: number }) {
  const { camera, gl } = useThree();
  const ref = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const c = new OrbitControls(camera, gl.domElement);
    c.enableDamping = true;
    c.dampingFactor = 0.1;
    c.maxPolarAngle = Math.PI / 2 - 0.05;
    ref.current = c;
    return () => c.dispose();
  }, [camera, gl]);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const center = mapCenter(doc);
    const span = Math.max(doc.width, doc.height) * CELL_SIZE;
    c.target.copy(center);
    if (preset === "top") {
      camera.position.set(center.x, span * 1.35, center.z + 0.001);
      c.enableRotate = false;
    } else {
      camera.position.set(center.x + span * 0.45, span * 0.7, center.z + span * 0.9);
      c.enableRotate = true;
    }
    camera.lookAt(center);
    c.update();
  }, [doc.width, doc.height, preset, fitToken, camera]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(() => ref.current?.update());
  return null;
}

const envCache = new Map<string, Promise<THREE.DataTexture>>();
function loadEquirect(url: string, kind: "hdr" | "exr"): Promise<THREE.DataTexture> {
  const hit = envCache.get(url);
  if (hit) return hit;
  const p = new Promise<THREE.DataTexture>((resolve, reject) => {
    const loader = kind === "exr" ? new EXRLoader() : new RGBELoader();
    loader.load(url, (t) => resolve(t as THREE.DataTexture), undefined, reject);
  }).catch((e) => {
    envCache.delete(url);
    throw e;
  });
  envCache.set(url, p);
  return p;
}

/** Renderer, tone mapping, env map, background. */
function Setup({ settings }: { settings: ViewSettings }) {
  const { scene, gl } = useThree();
  const pmremRef = useRef<Map<string, THREE.Texture>>(new Map());

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = settings.exposure;
  }, [gl, settings.exposure]);

  useEffect(() => {
    const opt = ENV_OPTIONS.find((o) => o.id === settings.envId) ?? ENV_OPTIONS[0];
    let alive = true;
    const bg = new THREE.Color(settings.backgroundColor);
    if (!opt.url || opt.kind === "none") {
      scene.environment = null;
      scene.background = bg;
      return;
    }
    const apply = (tex: THREE.Texture) => {
      if (!alive) return;
      scene.environment = tex;
      scene.environmentIntensity = settings.envIntensity;
      scene.background = settings.envBackground ? tex : bg;
      scene.backgroundBlurriness = settings.envBackground ? 0.35 : 0;
      scene.backgroundIntensity = 1;
    };
    const cached = pmremRef.current.get(opt.url);
    if (cached) {
      apply(cached);
      return () => {
        alive = false;
      };
    }
    scene.background = bg;
    loadEquirect(opt.url, opt.kind === "exr" ? "exr" : "hdr")
      .then((tex) => {
        if (!alive) return;
        const pmrem = new THREE.PMREMGenerator(gl);
        const env = pmrem.fromEquirectangular(tex).texture;
        pmrem.dispose();
        pmremRef.current.set(opt.url!, env);
        apply(env);
      })
      .catch((e) => console.warn("[game_design] env load failed", e));
    return () => {
      alive = false;
    };
  }, [scene, gl, settings.envId, settings.envIntensity, settings.envBackground, settings.backgroundColor]);

  return null;
}

function Lights({ doc, settings }: { doc: MapDoc; settings: ViewSettings }) {
  const ref = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const center = mapCenter(doc);
  const span = Math.max(doc.width, doc.height) * CELL_SIZE;

  useLayoutEffect(() => {
    const l = ref.current;
    const t = targetRef.current;
    if (!l || !t) return;
    l.target = t;
    t.position.set(center.x, 0, center.z);
    t.updateMatrixWorld();

    const az = THREE.MathUtils.degToRad(settings.sunAzimuthDeg);
    const el = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(settings.sunElevationDeg, 5, 89));
    const dir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az));
    const dist = span * 1.6;
    l.position.set(center.x, 0, center.z).addScaledVector(dir, dist);

    l.castShadow = settings.shadowEnabled;
    setShadowResolution(l.shadow, settings.shadowResolution);
    l.shadow.bias = settings.shadowResolution <= 1024 ? -0.0008 : -0.00015;
    l.shadow.normalBias = settings.shadowResolution <= 1024 ? 0.03 : 0.012;
    l.shadow.radius = settings.shadowSoftness;
    (l.shadow as THREE.LightShadow & { intensity: number }).intensity = settings.shadowIntensity;

    // tight ortho frustum around the map so 2048 stays crisp
    const cam = l.shadow.camera as THREE.OrthographicCamera;
    const r = Math.max(doc.width, doc.height) * CELL_SIZE * 0.62 + 2;
    cam.left = -r;
    cam.right = r;
    cam.top = r;
    cam.bottom = -r;
    cam.near = 1;
    cam.far = dist + r * 2 + 10;
    cam.updateProjectionMatrix();
    l.shadow.needsUpdate = true;
  }, [center.x, center.z, span, doc.width, doc.height, settings]);

  return (
    <>
      <ambientLight color="#dfe3f2" intensity={settings.ambientIntensity} />
      <hemisphereLight args={[settings.backgroundColor, "#8a93a6", 0.25]} />
      <directionalLight ref={ref} color="#fff5e8" intensity={settings.sunIntensity} castShadow />
      <object3D ref={targetRef} />
    </>
  );
}

function Diagnostics({ onDiag }: { onDiag?: (d: SceneDiag) => void }) {
  const { scene, gl } = useThree();
  useEffect(() => {
    if (!onDiag) return;
    const tick = () => {
      let casters = 0;
      let receivers = 0;
      let meshes = 0;
      let light: THREE.DirectionalLight | null = null;
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          meshes += 1;
          if (m.castShadow) casters += 1;
          if (m.receiveShadow) receivers += 1;
        }
        if ((o as THREE.DirectionalLight).isDirectionalLight) light = o as THREE.DirectionalLight;
      });
      let gpu = "?";
      try {
        const ctx = gl.getContext() as WebGLRenderingContext;
        const ext = ctx.getExtension("WEBGL_debug_renderer_info");
        gpu = ext ? String(ctx.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : String(ctx.getParameter(ctx.RENDERER));
      } catch {
        /* ignore */
      }
      const l = light as THREE.DirectionalLight | null;
      onDiag({
        gpu,
        shadowMapEnabled: gl.shadowMap.enabled,
        shadowMapType: gl.shadowMap.type,
        lightCastShadow: Boolean(l?.castShadow),
        shadowMapSize: l?.shadow.map?.width ?? 0,
        shadowMapAllocated: Boolean(l?.shadow.map),
        casters,
        receivers,
        meshes,
        envSet: Boolean(scene.environment),
        pixelRatio: gl.getPixelRatio(),
      });
    };
    tick();
    const id = window.setInterval(tick, 2000);
    return () => window.clearInterval(id);
  }, [scene, gl, onDiag]);
  return null;
}

function GroundGrid({ doc }: { doc: MapDoc }) {
  const geom = useMemo(() => {
    const pts: number[] = [];
    const x0 = -CELL_SIZE / 2;
    const z0 = -CELL_SIZE / 2;
    const x1 = x0 + doc.width * CELL_SIZE;
    const z1 = z0 + doc.height * CELL_SIZE;
    for (let i = 0; i <= doc.width; i += 1) pts.push(x0 + i * CELL_SIZE, 0, z0, x0 + i * CELL_SIZE, 0, z1);
    for (let j = 0; j <= doc.height; j += 1) pts.push(x0, 0, z0 + j * CELL_SIZE, x1, 0, z0 + j * CELL_SIZE);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [doc.width, doc.height]);
  const center = mapCenter(doc);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[center.x, -0.02, center.z]} receiveShadow>
        <planeGeometry args={[doc.width * CELL_SIZE + 16, doc.height * CELL_SIZE + 16]} />
        <shadowMaterial transparent opacity={0.25} />
      </mesh>
      <lineSegments geometry={geom} position={[0, 0.005, 0]}>
        <lineBasicMaterial color="#7f889e" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

const labelTexCache = new Map<string, THREE.CanvasTexture>();
function labelTexture(text: string): THREE.CanvasTexture {
  const hit = labelTexCache.get(text);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#111";
  let size = 64;
  ctx.font = `700 ${size}px Lexend, system-ui, sans-serif`;
  while (ctx.measureText(text).width > c.width - 40 && size > 20) {
    size -= 4;
    ctx.font = `700 ${size}px Lexend, system-ui, sans-serif`;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, c.width / 2, c.height / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  labelTexCache.set(text, t);
  return t;
}

/** Custom counter: plain white block with the designer's label printed on top and on the front. */
function CustomBlock({ label, w, h, height }: { label: string; w: number; h: number; height: number }) {
  const tex = useMemo(() => labelTexture(label || "?"), [label]);
  const sx = w * CELL_SIZE * 0.92;
  const sz = h * CELL_SIZE * 0.92;
  return (
    <group>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[sx, height, sz]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0} />
      </mesh>
      <lineSegments position={[0, height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(sx, height, sz)]} />
        <lineBasicMaterial color="#111827" />
      </lineSegments>
      <mesh position={[0, height + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[sx * 0.92, sz * 0.92 * 0.25]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh position={[0, height * 0.55, sz / 2 + 0.005]}>
        <planeGeometry args={[sx * 0.92, sx * 0.92 * 0.25]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function PlacedObject({ obj, selected, onSelect }: { obj: MapObject; selected: boolean; onSelect: (id: string, additive: boolean) => void }) {
  const entry = entryOf(obj);
  const [node, setNode] = useState<THREE.Group | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const url = entry?.assetUrl ?? null;

  useEffect(() => {
    let alive = true;
    let timer: number | undefined;
    setFailed(false);
    if (!url) return;
    loadGltfTemplate(url)
      .then((t) => alive && setNode(t.clone(true)))
      .catch(() => {
        if (!alive) return;
        setFailed(true);
        if (attempt < 4) timer = window.setTimeout(() => setAttempt((a) => a + 1), 1500 * (attempt + 1));
      });
    return () => {
      alive = false;
      if (timer) window.clearTimeout(timer);
    };
  }, [url, attempt]);

  const [w, h] = objectFootprint(obj);
  const pos = worldPositionOf(obj);
  const isFloor = objectLayer(obj) === 0;
  const boxH = entry?.height ?? (isFloor ? 0.1 : 1.2);

  return (
    <group position={pos} rotation={[0, THREE.MathUtils.degToRad(obj.rot), 0]}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelect(obj.id, e.nativeEvent.shiftKey);
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        {entry?.custom ? (
          <CustomBlock label={obj.label ?? ""} w={entry.footprint[0]} h={entry.footprint[1]} height={entry.height ?? 1} />
        ) : node ? (
          <primitive object={node} />
        ) : (
          <mesh position={[0, boxH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[(entry?.footprint[0] ?? 1) * CELL_SIZE * 0.9, boxH, (entry?.footprint[1] ?? 1) * CELL_SIZE * 0.9]} />
            <meshStandardMaterial color={failed ? "#f87171" : entry?.color ?? "#cbd5e1"} roughness={0.8} />
          </mesh>
        )}
      </group>
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <planeGeometry args={[w * CELL_SIZE + 0.2, h * CELL_SIZE + 0.2]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.35} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

export default function MapScene3D({ doc, selectedIds, visibility, cameraPreset, fitToken, settings, onSelect, onDiag, playing = false, onHud }: Props) {
  const center = mapCenter(doc);
  const span = Math.max(doc.width, doc.height) * CELL_SIZE;
  const visible = doc.objects.filter((o) => visibility[layerTypeOf(objectLayer(o))]);
  const sel = new Set(selectedIds);

  return (
    <Canvas
      style={{ filter: `saturate(${settings.saturation})` }}
      shadows={settings.shadowEnabled}
      dpr={[1, 2]}
      camera={{ fov: 42, near: 0.1, far: 600, position: [center.x + span * 0.45, span * 0.7, center.z + span * 0.9] }}
      gl={{ antialias: true }}
      onPointerMissed={() => !playing && onSelect(null, false)}
    >
      <Setup settings={settings} />
      <Lights doc={doc} settings={settings} />
      <GroundGrid doc={doc} />
      {visible.map((o) => (
        <PlacedObject key={o.id} obj={o} selected={!playing && sel.has(o.id)} onSelect={playing ? noSelect : onSelect} />
      ))}
      {playing ? <DuckPlayer doc={doc} onHud={onHud} /> : <Controls doc={doc} preset={cameraPreset} fitToken={fitToken} />}
      <Diagnostics onDiag={onDiag} />
    </Canvas>
  );
}
