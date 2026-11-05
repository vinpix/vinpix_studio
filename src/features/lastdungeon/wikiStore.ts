/**
 * Single import point for the wiki UI (a seam so UI code never reaches into
 * data/ directly). Re-exports the real registry.
 */
export {
  allArticles,
  articlesByCategory,
  categories,
  getArticle,
  getCategory,
} from "./data";
