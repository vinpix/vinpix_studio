import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const cache = new Map<string, Promise<THREE.Group>>();

// Same forced PBR look as the Kitchen Together previewer so lighting reads consistently.
const FORCED_ROUGHNESS = 0.5;
const FORCED_METALNESS = 0.25;
const FORCED_ENV_INTENSITY = 1;

function toPbr(material: THREE.Material): THREE.Material {
  if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
    material.roughness = FORCED_ROUGHNESS;
    material.metalness = FORCED_METALNESS;
    material.envMapIntensity = FORCED_ENV_INTENSITY;
    material.shadowSide = THREE.DoubleSide;
    material.needsUpdate = true;
    return material;
  }
  if (
    material instanceof THREE.MeshBasicMaterial ||
    material instanceof THREE.MeshLambertMaterial ||
    material instanceof THREE.MeshPhongMaterial ||
    material instanceof THREE.MeshToonMaterial
  ) {
    const src = material as THREE.Material & { color: THREE.Color; map?: THREE.Texture | null; emissive?: THREE.Color };
    const m = new THREE.MeshStandardMaterial({
      name: material.name,
      color: src.color.clone(),
      map: src.map ?? null,
      transparent: material.transparent,
      opacity: material.opacity,
      alphaTest: material.alphaTest,
      side: material.side,
      emissive: src.emissive ? src.emissive.clone() : new THREE.Color(0),
      roughness: FORCED_ROUGHNESS,
      metalness: FORCED_METALNESS,
      envMapIntensity: FORCED_ENV_INTENSITY,
    });
    m.shadowSide = THREE.DoubleSide;
    return m;
  }
  return material;
}

/** Load a GLB once and hand out the template scene; callers clone() it. */
export function loadGltfTemplate(url: string): Promise<THREE.Group> {
  const hit = cache.get(url);
  if (hit) return hit;
  const p = new Promise<THREE.Group>((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        gltf.scene.traverse((node) => {
          const mesh = node as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.material = Array.isArray(mesh.material) ? mesh.material.map(toPbr) : toPbr(mesh.material);
        });
        resolve(gltf.scene);
      },
      undefined,
      reject
    );
  }).catch((err) => {
    cache.delete(url);
    throw err;
  });
  cache.set(url, p);
  return p;
}

export type GltfBundle = { scene: THREE.Group; animations: THREE.AnimationClip[] };
const bundleCache = new Map<string, Promise<GltfBundle>>();

/** Like loadGltfTemplate but keeps the animation clips (characters). Clone with SkeletonUtils. */
export function loadGltfBundle(url: string): Promise<GltfBundle> {
  const hit = bundleCache.get(url);
  if (hit) return hit;
  const p = new Promise<GltfBundle>((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        gltf.scene.traverse((node) => {
          const mesh = node as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = true;
          mesh.receiveShadow = false;
          mesh.frustumCulled = false;
          mesh.material = Array.isArray(mesh.material) ? mesh.material.map(toPbr) : toPbr(mesh.material);
        });
        resolve({ scene: gltf.scene, animations: gltf.animations });
      },
      undefined,
      reject
    );
  }).catch((err) => {
    bundleCache.delete(url);
    throw err;
  });
  bundleCache.set(url, p);
  return p;
}
