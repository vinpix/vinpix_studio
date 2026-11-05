import {
  BookOpen,
  Cog,
  Crosshair,
  Crown,
  Map as MapIcon,
  Package,
  PawPrint,
  Skull,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";

// Explicit map (no namespace import) so the client bundle only carries these.
const ICONS: Record<string, LucideIcon> = {
  Swords,
  PawPrint,
  Crosshair,
  Sparkles,
  Skull,
  Crown,
  Package,
  Map: MapIcon,
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
