import type { WikiArticle, WikiCategoryId } from "../types";
import { categories } from "./categories";
import { weapons } from "./weapons";
import { enemies } from "./enemies";
import { bosses } from "./bosses";
import { characters } from "./characters";
import { anomalies } from "./anomalies";
import { perks } from "./perks";
import { levels } from "./levels";
import { items } from "./items";
import { mechanics } from "./mechanics";

export { categories };

export const articlesByCategory: Record<WikiCategoryId, WikiArticle[]> = {
  weapons,
  enemies,
  bosses,
  characters,
  anomalies,
  perks,
  levels,
  items,
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
