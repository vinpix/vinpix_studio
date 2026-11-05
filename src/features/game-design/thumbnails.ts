import * as THREE from "three";
import { loadGltfTemplate } from "./gltfCache";
import { rotatedFootprint } from "./catalog";
import { CELL_SIZE, type CatalogEntry, type Rotation } from "./types";

/**
 * Oblique ("2.5D") thumbnails of catalog GLBs, rendered in-browser with one
 * shared offscreen renderer. One image per (object, rotation). The camera looks
 * from the front (+z, i.e. the bottom of the 2D view) tilted down by TILT_DEG, so
 * the ground footprint keeps its width and the object rises upward on screen.
 * Floors are rendered straight top-down since they are flat.
 */

export type Thumb = {
  url: string;
  /** image size in px */
  w: number;
  h: number;
  /** px from image top to the ground-plane center of the footprint */
  groundY: number;
  /** world width covered by the image (== rotated footprint width) */
  worldW: number;
};

const PX_PER_UNIT = 48; // 1 cell (2 units) = 96px
const TILT_DEG = 60;
const cache = new Map<string, Promise<Thumb>>();
let renderer: THREE.WebGLRenderer | null = null;
let queue: Promise<unknown> = Promise.resolve();
let pending = 0;
let idleTimer: number | undefined;

/** Free the offscreen WebGL context once no thumbnails are pending (browsers cap live contexts). */
function scheduleRelease() {
  if (idleTimer) window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (pending > 0 || !renderer) return;
    renderer.dispose();
    renderer.forceContextLoss();
    renderer = null;
  }, 1500);
}

export const thumbKey = (key: string, rot: Rotation) => `${key}:${rot}`;

function getRenderer(): THREE.WebGLRenderer {
  if (renderer) return renderer;
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

async function renderOne(entry: CatalogEntry, rot: Rotation): Promise<Thumb> {
  if (!entry.assetUrl) throw new Error("no asset");
  const template = await loadGltfTemplate(entry.assetUrl);
  const r = getRenderer();
  const isFloor = entry.layer === 0;
  const tilt = THREE.MathUtils.degToRad(isFloor ? 90 : TILT_DEG);
  const [fw, fh] = rotatedFootprint(entry, rot);
  const worldW = fw * CELL_SIZE;

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0xaab3c6, 1.4));
  const key = new THREE.DirectionalLight(0xfff4e6, 2.4);
  key.position.set(2.5, 7, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 2;
  key.shadow.bias = -0.0004;
  const sc = key.shadow.camera as THREE.OrthographicCamera;
  sc.left = sc.bottom = -6;
  sc.right = sc.top = 6;
  sc.near = 0.5;
  sc.far = 30;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.7);
  fill.position.set(-4, 4, -3);
  scene.add(fill);

  const node = template.clone(true);
  node.rotation.y = THREE.MathUtils.degToRad(rot);
  node.updateMatrixWorld(true);
  scene.add(node);

  // soft ground shadow catcher (only for non-floor objects)
  if (!isFloor) {
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.22 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.001;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  const dir = new THREE.Vector3(0, Math.sin(tilt), Math.cos(tilt)).normalize();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
  cam.position.copy(dir.clone().multiplyScalar(60));
  cam.up.set(0, isFloor ? 0 : 1, isFloor ? -1 : 0);
  cam.lookAt(0, 0, 0);
  cam.updateMatrixWorld(true);
  const toView = cam.matrixWorldInverse;

  // vertical extent: projected bbox of the model + the ground footprint
  const box = new THREE.Box3().setFromObject(node);
  const halfD = (fh * CELL_SIZE) / 2;
  const pts = [
    new THREE.Vector3(0, 0, -halfD),
    new THREE.Vector3(0, 0, halfD),
    ...[0, 1].flatMap((ix) =>
      [0, 1].flatMap((iy) =>
        [0, 1].map((iz) => new THREE.Vector3(ix ? box.max.x : box.min.x, iy ? box.max.y : box.min.y, iz ? box.max.z : box.min.z))
      )
    ),
  ];
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    const v = p.clone().applyMatrix4(toView);
    minY = Math.min(minY, v.y);
    maxY = Math.max(maxY, v.y);
  }
  const padY = isFloor ? 0 : 0.15;
  minY -= padY;
  maxY += padY;
  const halfW = worldW / 2;
  cam.left = -halfW;
  cam.right = halfW;
  cam.top = maxY;
  cam.bottom = minY;
  cam.updateProjectionMatrix();

  const w = Math.max(8, Math.round(worldW * PX_PER_UNIT));
  const h = Math.max(8, Math.round((maxY - minY) * PX_PER_UNIT));
  r.setSize(w, h, false);
  r.render(scene, cam);
  const url = r.domElement.toDataURL("image/png");
  scene.clear();
  const groundY = ((maxY - 0) / (maxY - minY)) * h;
  return { url, w, h, groundY, worldW };
}

export function getThumbnail(entry: CatalogEntry, rot: Rotation): Promise<Thumb> {
  const k = thumbKey(entry.key, rot);
  const hit = cache.get(k);
  if (hit) return hit;
  pending += 1;
  const p = queue
    .then(() => renderOne(entry, rot))
    .catch((e) => {
      cache.delete(k);
      throw e;
    })
    .finally(() => {
      pending -= 1;
      scheduleRelease();
    });
  queue = p.catch(() => undefined);
  cache.set(k, p);
  return p;
}
