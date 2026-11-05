/**
 * The Last Dungeon wiki data model. Every wiki page is one `WikiArticle`; each
 * category's articles live in `data/<category>.ts` as a plain array.
 *
 * Rich text (paragraphs, bullets, table cells, infobox values, trivia):
 *   **bold**, *italic*, and internal links `[[category/slug]]` or
 *   `[[category/slug|label]]` (e.g. `[[bosses/heavy-knight|the Heavy Knight]]`).
 *   Links must point at an article that exists (the validator checks).
 */

export type WikiCategoryId =
  | "heroes"
  | "pets"
  | "weapons"
  | "buffs"
  | "enemies"
  | "bosses"
  | "items"
  | "dungeons"
  | "mechanics";

export interface WikiImage {
  /** Public path under /ld, e.g. "/ld/wiki/weapons/shotgun.png". */
  src: string;
  alt: string;
  /** Pixel art: render with image-rendering: pixelated (default true). */
  pixelated?: boolean;
  width?: number;
  height?: number;
  caption?: string;
}

export interface InfoboxRow {
  label: string;
  value: string;
}

export interface WikiTable {
  columns: string[];
  rows: string[][];
}

export interface WikiSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: WikiTable;
  /** Animated clips (GIFs recorded in game) shown under the text, captioned. */
  media?: WikiImage[];
  /** Optional nested sub-sections (rendered as h3). */
  subsections?: WikiSection[];
}

export interface WikiRef {
  category: WikiCategoryId;
  slug: string;
}

export interface WikiArticle {
  /** kebab-case, unique within its category. URL: /wiki/<category>/<slug> */
  slug: string;
  category: WikiCategoryId;
  name: string;
  /** Short type line under the title, e.g. "Epic rifle" or "Floor 8 boss". */
  subtitle?: string;
  /** 1–2 sentences. Used on cards, search results and meta description. */
  summary: string;
  image?: WikiImage;
  /** Right-hand infobox rows (stats, family, rarity, unlock...). */
  infobox?: InfoboxRow[];
  sections: WikiSection[];
  /** Filter chips on the category page (family, rarity, frequency...). */
  tags?: string[];
  gallery?: WikiImage[];
  trivia?: string[];
  related?: WikiRef[];
}

export interface WikiCategory {
  id: WikiCategoryId;
  title: string;
  /** Singular noun for one article, e.g. "Weapon". */
  singular: string;
  description: string;
  /** lucide-react icon name used by the UI. */
  icon: string;
  /** Infobox labels to show as columns in the category table view. */
  tableColumns: string[];
}
