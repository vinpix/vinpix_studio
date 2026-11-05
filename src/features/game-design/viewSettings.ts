/** 3D view look settings (ported from the Kitchen Together previewer controls). */

export type EnvOption = { id: string; label: string; url: string | null; kind: "hdr" | "exr" | "none" };

export const ENV_OPTIONS: EnvOption[] = [
  { id: "neutral", label: "Game neutral (nhanh)", url: "/map-preview/env/neutral.hdr", kind: "hdr" },
  { id: "game", label: "Game Godot EXR (nặng, 5MB)", url: "/map-preview/env/map-editor-default.exr", kind: "exr" },
  { id: "studio", label: "Studio", url: "/envmaps/studio.hdr", kind: "hdr" },
  { id: "sunset", label: "Hoàng hôn", url: "/envmaps/sunset.hdr", kind: "hdr" },
  { id: "city", label: "Phố", url: "/envmaps/city.hdr", kind: "hdr" },
  { id: "field", label: "Trời", url: "/envmaps/field.hdr", kind: "hdr" },
  { id: "night", label: "Đêm", url: "/envmaps/night.hdr", kind: "hdr" },
  { id: "none", label: "Không (chỉ đèn)", url: null, kind: "none" },
];

export type ViewSettings = {
  envId: string;
  /** 0..2 how strongly the env map lights the scene */
  envIntensity: number;
  /** show the env map as the sky, otherwise flat color */
  envBackground: boolean;
  backgroundColor: string;
  exposure: number;
  /** Display saturation multiplier; 1 preserves rendered colors. */
  saturation: number;
  sunIntensity: number;
  ambientIntensity: number;
  shadowEnabled: boolean;
  shadowIntensity: number;
  shadowResolution: 1024 | 2048 | 4096;
  shadowSoftness: number;
  /** sun direction */
  sunAzimuthDeg: number;
  sunElevationDeg: number;
};

// Balanced lighting with richer colors and readable shaded faces.
export const DEFAULT_VIEW_SETTINGS: ViewSettings = {
  envId: "neutral",
  envIntensity: 0.95,
  envBackground: false,
  backgroundColor: "#bbdcf2",
  exposure: 1.02,
  saturation: 1.35,
  sunIntensity: 1.7,
  ambientIntensity: 0,
  shadowEnabled: true,
  shadowIntensity: 0.98,
  shadowResolution: 2048,
  shadowSoftness: 3.2,
  // sun from the back-left so shadows fall toward the default camera (front-right)
  sunAzimuthDeg: -133,
  sunElevationDeg: 43,
};

const KEY = "vinpix.gameDesign.viewSettings.v5";
const V4_KEY = "vinpix.gameDesign.viewSettings.v4";
const PREVIOUS_KEY = "vinpix.gameDesign.viewSettings.v3";
const LEGACY_KEY = "vinpix.gameDesign.viewSettings.v2";

/** Upgrade old defaults without overwriting values the user has customized. */
export function upgradeViewSettings(saved: Partial<ViewSettings>, version: 2 | 3 | 4 = 2): ViewSettings {
  const next = { ...DEFAULT_VIEW_SETTINGS, ...saved };
  const previous = version === 4
    ? { envIntensity: 0.7, exposure: 1.02, saturation: 1.2, sunIntensity: 2.0, ambientIntensity: 0.4, shadowIntensity: 0.6, shadowSoftness: 1.6, sunAzimuthDeg: -140, sunElevationDeg: 40 }
    : version === 3
    ? { envIntensity: 0.85, exposure: 1.12, ambientIntensity: 0.6, shadowIntensity: 0.6 }
    : { envIntensity: 0.6, exposure: 1.05, ambientIntensity: 0.2, shadowIntensity: 0.85 };
  for (const key of Object.keys(previous) as Array<keyof typeof previous>) {
    if (saved[key] === previous[key]) next[key] = DEFAULT_VIEW_SETTINGS[key];
  }
  return next;
}

export function loadViewSettings(): ViewSettings {
  if (typeof window === "undefined") return DEFAULT_VIEW_SETTINGS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_VIEW_SETTINGS, ...(JSON.parse(raw) as Partial<ViewSettings>) };
    const v4 = window.localStorage.getItem(V4_KEY);
    if (v4) return upgradeViewSettings(JSON.parse(v4) as Partial<ViewSettings>, 4);
    const previous = window.localStorage.getItem(PREVIOUS_KEY);
    if (previous) return upgradeViewSettings(JSON.parse(previous) as Partial<ViewSettings>, 3);
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    return legacy ? upgradeViewSettings(JSON.parse(legacy) as Partial<ViewSettings>) : DEFAULT_VIEW_SETTINGS;
  } catch {
    return DEFAULT_VIEW_SETTINGS;
  }
}

export function saveViewSettings(s: ViewSettings): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}
