import type { LightShadow } from "three";

/** Match the allocated texture, including one created before light setup ran. */
export function setShadowResolution(shadow: LightShadow, resolution: number): void {
  if (shadow.map && (shadow.map.width !== resolution || shadow.map.height !== resolution)) {
    shadow.map.dispose();
    shadow.map = null;
  }
  shadow.mapSize.set(resolution, resolution);
  shadow.needsUpdate = true;
}
