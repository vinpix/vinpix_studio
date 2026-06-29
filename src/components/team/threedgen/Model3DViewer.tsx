"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Loader2, AlertCircle } from "lucide-react";
import { getPresignedUrl } from "@/lib/smartChatApi";

interface Model3DViewerProps {
  modelKey: string;
  className?: string;
}

/**
 * Self-hosted GLB viewer (three.js — already a project dependency, no CDN).
 * The GLB is fetched same-origin through /api/proxy-image to dodge S3 CORS, then
 * parsed in-memory; orbit controls + auto-rotate for a quick look.
 */
export function Model3DViewer({ modelKey, className }: Model3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        setError(false);
        const presigned = await getPresignedUrl(modelKey);
        const res = await fetch(
          `/api/proxy-image?url=${encodeURIComponent(presigned)}`
        );
        if (!res.ok) throw new Error(`GLB fetch failed: ${res.status}`);
        const buf = await res.arrayBuffer();
        if (disposed) return;

        const width = container.clientWidth || 480;
        const height = container.clientHeight || 360;

        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const key = new THREE.DirectionalLight(0xffffff, 1.1);
        key.position.set(3, 5, 4);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.5);
        fill.position.set(-4, -2, -3);
        scene.add(fill);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.4;

        const loader = new GLTFLoader();
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

            camera.position.set(0, 0.6, 4);
            controls.update();
            setLoading(false);

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

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      controls?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [modelKey]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div ref={containerRef} className="h-full w-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <Loader2 className="animate-spin text-black/50" size={28} />
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
