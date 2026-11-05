import { Suspense } from "react";
import MapStudioClient from "@/components/game-design/studio/MapStudioClient";

export default function MapStudioPage() {
  return (
    <Suspense fallback={<div className="h-full grid place-items-center text-sm text-gray-500">Đang tải…</div>}>
      <MapStudioClient />
    </Suspense>
  );
}
