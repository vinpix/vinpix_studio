import "@/components/lastdungeon/wiki/wiki.css";
import { WikiShell } from "@/components/lastdungeon/wiki/WikiShell";
import {
  allArticles,
  articlesByCategory,
  categories,
} from "@/features/lastdungeon/wikiStore";

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const nav = categories.map((c) => ({
    id: c.id,
    title: c.title,
    icon: c.icon,
    count: articlesByCategory[c.id].length,
  }));
  return (
    <WikiShell categories={nav} total={allArticles.length}>
      {children}
    </WikiShell>
  );
}
