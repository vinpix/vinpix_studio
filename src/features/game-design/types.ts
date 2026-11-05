/**
 * Kitchen Together map editor — shared types.
 *
 * Coordinate model (mirrors the Godot map editor that kt_onchain2 previews):
 *   - The map is a grid of cells; one cell = CELL_SIZE world units (2.0).
 *   - grid_position [gx, gy] -> world_position [gx * 2, 0, gy * 2] (x, y-up, z).
 *   - 2D top-down view: +x to the right, +z (gy) downward.
 *   - rotation is degrees around Y (0 / 90 / 180 / 270).
 */

export const CELL_SIZE = 2;

export type MapLayer = 0 | 1 | 2 | 3;
export type MapLayerType = "floor" | "counter" | "movable" | "decor";

export type Rotation = 0 | 90 | 180 | 270;

export type CatalogEntry = {
  /** object_type written to the map JSON (Godot mapEditorKey) */
  key: string;
  /** Vietnamese label shown on the 2D tile / palette */
  label: string;
  /** Alternate labels the designer uses in Figma (for search) */
  aliases?: string[];
  layer: MapLayer;
  /** footprint in cells at rotation 0: [w, h] */
  footprint: [number, number];
  /** GLB url under /public; null -> box placeholder in 3D */
  assetUrl: string | null;
  /** tile color in 2D */
  color: string;
  /** approx height in world units for the placeholder box */
  height?: number;
  /** designer-named placeholder: plain block, label typed per placed object */
  custom?: boolean;
};

export type MapObject = {
  id: string;
  key: string;
  gx: number;
  gy: number;
  rot: Rotation;
  /** allow per-object layer override (defaults to catalog layer) */
  layer?: MapLayer;
  /** free-text name shown on the tile (custom counter) */
  label?: string;
};

export type MapDoc = {
  id: string;
  name: string;
  /** free text: recipe / notes, e.g. "Hamburger thập cẩm" */
  notes: string;
  width: number;
  height: number;
  objects: MapObject[];
  createdAt: string;
  updatedAt: string;
};

export type EditorTool = "place" | "select";
export type ViewMode = "2d" | "3d";

export type LayerVisibility = Record<MapLayerType, boolean>;

export function layerTypeOf(layer: MapLayer): MapLayerType {
  if (layer === 0) return "floor";
  if (layer === 1) return "counter";
  if (layer === 2) return "movable";
  return "decor";
}

export function layerFromRaw(raw: number): MapLayer {
  if (raw === 0 || raw === 1 || raw === 2) return raw;
  return 3;
}
