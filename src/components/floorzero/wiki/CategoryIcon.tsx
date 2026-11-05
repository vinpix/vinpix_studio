import {
  BookOpen,
  Cog,
  Crosshair,
  Crown,
  Map as MapIcon,
  Package,
  Skull,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

// Explicit map (no namespace import) so the client bundle only carries these.
const ICONS: Record<string, LucideIcon> = {
  Crosshair,
  Skull,
  Crown,
  Users,
  Sparkles,
  TrendingUp,
  Map: MapIcon,
  Package,
  Cog,
};

export function CategoryIcon({
  name,
  className,
  size = 18,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon aria-hidden="true" size={size} className={className} />;
}
