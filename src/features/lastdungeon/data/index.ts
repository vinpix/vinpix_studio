import type { WikiArticle, WikiCategoryId } from "../types";
import { categories } from "./categories";
import { heroes } from "./heroes";
import { pets } from "./pets";
import { weapons } from "./weapons";
import { buffs } from "./buffs";
import { enemies } from "./enemies";
import { bosses } from "./bosses";
import { items } from "./items";
import { dungeons } from "./dungeons";
import { mechanics } from "./mechanics";

export { categories };

export const articlesByCategory: Record<WikiCategoryId, WikiArticle[]> = {
  heroes,
  pets,
  weapons,
  buffs,
  enemies,
  bosses,
  items,
  dungeons,
  mechanics,
};

export const allArticles: WikiArticle[] = categories.flatMap(
  (c) => articlesByCategory[c.id]
);

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function getArticle(category: string, slug: string) {
  return articlesByCategory[category as WikiCategoryId]?.find(
    (a) => a.slug === slug
  );
}
