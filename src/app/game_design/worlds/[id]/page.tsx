import { Suspense } from "react";
import WorldScreen from "@/components/game-design/studio/WorldScreen";

export default async function WorldPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <WorldScreen worldId={id} />
    </Suspense>
  );
}
