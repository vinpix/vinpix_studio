"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { Loader2, AlertCircle, Mountain } from "lucide-react";
import { getPresignedUrl } from "@/lib/smartChatApi";
import { downloadPresigned, type DownloadProgress } from "@/lib/s3Fetch";

interface Model3DViewerProps {
  modelKey: string;
  className?: string;
}

type EnvPresetId = "lights" | "studio" | "sunset" | "city" | "night" | "field";

interface EnvPreset {
  id: EnvPresetId;
  label: string;
  /** null = classic 3-light rig, no image-based lighting */
  file: string | null;
}

/** CC0 HDRIs (Poly Haven, 1k) served from /public/envmaps/ */
const ENV_PRESETS: EnvPreset[] = [
  { id: "studio", label: "Studio", file: "/envmaps/studio.hdr" },
  { id: "sunset", label: "Hoàng hôn", file: "/envmaps/sunset.hdr" },
  { id: "city", label: "Phố", file: "/envmaps/city.hdr" },
  { id: "night", label: "Đêm", file: "/envmaps/night.hdr" },
  { id: "field", label: "Trời", file: "/envmaps/field.hdr" },
  { id: "lights", label: "Đèn", file: null },
];

interface EnvEntry {
  /** PMREM-filtered texture for scene.environment (IBL) */
  env: THREE.Texture;
  /** original equirect texture, kept sharp for scene.background */
  bg: THREE.Texture;
}

/**
 * Self-hosted GLB viewer (three.js — already a project dependency, no CDN).
 * The GLB is fetched straight from S3 via a presigned URL (bucket CORS allows
 * this origin; /api/proxy-image is only a fallback), then parsed in-memory;
 * orbit controls + auto-rotate for a quick look.
 * Lighting = switchable HDR environment maps (Rodin-style) with an optional
 * visible background, falling back to a plain light rig ("Đèn").
 */
export function Model3DViewer({ modelKey, className }: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);
  const [error, setError] = useState(false);
  const [envId, setEnvId] = useState<EnvPresetId>("studio");
  const [showBg, setShowBg] = useState(false);
  const [envLoading, setEnvLoading] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const pmremRef = useRef<THREE.PMREMGenerator | null>(null);
  const lightsRef = useRef<THREE.Group | null>(null);
  const envCacheRef = useRef<Map<EnvPresetId, EnvEntry>>(new Map());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    const handleResize = () => {
      if (!renderer || !camera || !container) return;
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);

    const run = async () => {
      try {
        setLoading(true);
        setProgress(null);
        setError(false);
        setSceneReady(false);
        const presigned = await getPresignedUrl(modelKey);
        const buf = await downloadPresigned(presigned, (p) => {
          if (!disposed) setProgress(p);
        });
        if (disposed) return;

        const width = container.clientWidth || 480;
        const height = container.clientHeight || 360;

        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        container.appendChild(renderer.domElement);

        sceneRef.current = scene;
        pmremRef.current = new THREE.PMREMGenerator(renderer);

        // fallback rig for the "Đèn" preset / when an HDR fails to load
        const lights = new THREE.Group();
        lights.add(new THREE.AmbientLight(0xffffff, 0.9));
        const key = new THREE.DirectionalLight(0xffffff, 1.1);
        key.position.set(3, 5, 4);
        lights.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.5);
        fill.position.set(-4, -2, -3);
        lights.add(fill);
        // stay lit while the HDR env downloads — the env effect hides the rig
        // once an environment texture is actually applied
        lights.visible = true;
        scene.add(lights);
        lightsRef.current = lights;

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.4;

        const loader = new GLTFLoader();
        // Tripo GLBs use EXT_meshopt_compression
        loader.setMeshoptDecoder(MeshoptDecoder);
        loader.parse(
          buf,
          "",
          (gltf) => {
            if (disposed || !camera || !controls) return;
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            model.scale.setScalar(2 / maxDim);
            scene.add(model);

            // fit the camera so the model fills the frame regardless of its
            // proportions (flat asset sheets used to look tiny from (0,.6,4))
            const sphere = new THREE.Box3()
              .setFromObject(model)
              .getBoundingSphere(new THREE.Sphere());
            const vFov = (camera.fov * Math.PI) / 180;
            const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
            const dist =
              (sphere.radius / Math.sin(Math.min(vFov, hFov) / 2)) * 1.1;
            camera.position
              .set(0.35, 0.4, 1)
              .normalize()
              .multiplyScalar(dist)
              .add(sphere.center);
            camera.near = Math.max(dist / 100, 0.01);
            camera.far = dist * 20;
            camera.updateProjectionMatrix();
            controls.target.copy(sphere.center);
            controls.update();
            setLoading(false);
            setSceneReady(true);

            const animate = () => {
              if (disposed || !renderer || !camera || !controls) return;
              frameId = requestAnimationFrame(animate);
              controls.update();
              renderer.render(scene, camera);
            };
            animate();
          },
          (err) => {
            console.error("[Model3DViewer] parse error", err);
            if (!disposed) {
              setError(true);
              setLoading(false);
            }
          }
        );

        ro.observe(container);
      } catch (e) {
        console.error("[Model3DViewer] load error", e);
        if (!disposed) {
          setError(true);
          setLoading(false);
        }
      }
    };

    run();

    const envCache = envCacheRef.current;
    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      controls?.dispose();
      envCache.forEach((entry) => {
        entry.env.dispose();
        entry.bg.dispose();
      });
      envCache.clear();
      pmremRef.current?.dispose();
      pmremRef.current = null;
      sceneRef.current = null;
      lightsRef.current = null;
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [modelKey]);

  // apply / switch the environment without reloading the model
  useEffect(() => {
    if (!sceneReady) return;
    const scene = sceneRef.current;
    const pmrem = pmremRef.current;
    const lights = lightsRef.current;
    if (!scene || !pmrem || !lights) return;

    let cancelled = false;
    const apply = (entry: EnvEntry | null) => {
      if (cancelled) return;
      scene.environment = entry?.env ?? null;
      scene.background = showBg && entry ? entry.bg : null;
      lights.visible = !entry;
    };

    const preset = ENV_PRESETS.find((p) => p.id === envId) ?? ENV_PRESETS[0];
    if (!preset.file) {
      apply(null);
      return;
    }
    const cached = envCacheRef.current.get(preset.id);
    if (cached) {
      apply(cached);
      return;
    }

    setEnvLoading(true);
    new RGBELoader()
      .loadAsync(preset.file)
      .then((equirect) => {
        const env = pmrem.fromEquirectangular(equirect).texture;
        equirect.mapping = THREE.EquirectangularReflectionMapping;
        const entry: EnvEntry = { env, bg: equirect };
        envCacheRef.current.set(preset.id, entry);
        apply(entry);
      })
      .catch((e) => {
        console.error("[Model3DViewer] env load error", e);
        apply(null);
      })
      .finally(() => {
        if (!cancelled) setEnvLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [envId, showBg, sceneReady]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div ref={containerRef} className="h-full w-full" />
      {!loading && !error && (
        <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center px-2">
          <div className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto border-2 border-black bg-white px-1 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {ENV_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setEnvId(p.id)}
                className={`whitespace-nowrap px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider transition-colors ${
                  envId === p.id
                    ? "bg-black text-white"
                    : "text-black/60 hover:bg-black/10"
                } ${envId === p.id && envLoading ? "animate-pulse" : ""}`}
              >
                {p.label}
              </button>
            ))}
            <span className="mx-0.5 h-4 w-px shrink-0 bg-black/20" />
            <button
              onClick={() => setShowBg((v) => !v)}
              aria-label="Hiện nền môi trường"
              title="Hiện nền môi trường"
              className={`shrink-0 px-1.5 py-1 transition-colors ${
                showBg
                  ? "bg-black text-white"
                  : "text-black/60 hover:bg-black/10"
              }`}
            >
              <Mountain size={11} />
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/5">
          <Loader2 className="animate-spin text-black/50" size={28} />
          {progress && (
            <div className="flex flex-col items-center gap-1.5">
              {progress.total !== null && (
                <div className="h-2.5 w-44 border-2 border-black bg-white">
                  <div
                    className="h-full bg-black"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((progress.loaded / progress.total) * 100)
                      )}%`,
                    }}
                  />
                </div>
              )}
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/60">
                {progress.total !== null
                  ? progress.loaded >= progress.total
                    ? "Đang dựng model…"
                    : `${Math.round(
                        (progress.loaded / progress.total) * 100
                      )}% · ${(progress.loaded / 1048576).toFixed(1)}/${(
                        progress.total / 1048576
                      ).toFixed(1)}MB`
                  : `Đã tải ${(progress.loaded / 1048576).toFixed(1)}MB`}
              </span>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/5 text-black/50">
          <AlertCircle size={28} />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Không tải được model 3D
          </span>
        </div>
      )}
    </div>
  );
}
