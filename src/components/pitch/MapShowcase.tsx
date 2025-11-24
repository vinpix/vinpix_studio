"use client";

import { useEffect, useState } from "react";
import { listTopMaps } from "@/lib/mapApi";
import type { Map, MapListResponse } from "@/lib/types/map";
import MapCard from "./MapCard";
import { Reveal } from "@/components/ui/Reveal";

export default function MapShowcase() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopMaps() {
      try {
        setLoading(true);
        setError(null);
        console.log("[MapShowcase] Fetching top maps...");
        const raw = await listTopMaps(6, "this_week");
        const response: unknown = raw;
        console.log("[MapShowcase] Received response:", raw);

        // Handle both response formats:
        // 1. {statusCode: 200, body: {items: [...], lastKey: {...}}}
        // 2. {items: [...], lastKey: {...}} (Lambda Function URL unwraps body)
        let mapsData: Map[] = [];

        // Narrowing helpers without using 'any'
        const isRecord = (v: unknown): v is Record<string, unknown> =>
          typeof v === "object" && v !== null;
        const isWrapped = (resp: unknown): resp is MapListResponse => {
          if (!isRecord(resp)) return false;
          if (!("statusCode" in resp) || !("body" in resp)) return false;
          const body = (resp as { body: unknown }).body;
          if (!isRecord(body)) return false;
          return Array.isArray((body as { items?: unknown }).items);
        };
        const hasItemsAtRoot = (
          resp: unknown
        ): resp is { items: Map[]; lastKey?: unknown } => {
          if (!isRecord(resp)) return false;
          return Array.isArray((resp as { items?: unknown }).items);
        };
        const hasArrayBody = (resp: unknown): resp is { body: Map[] } => {
          if (!isRecord(resp)) return false;
          return Array.isArray((resp as { body?: unknown }).body);
        };

        if (isWrapped(response)) {
          // Format 1: Wrapped response
          mapsData = response.body.items;
        } else if (hasItemsAtRoot(response)) {
          // Format 2: Direct body (Lambda Function URL unwraps)
          mapsData = response.items;
        } else if (hasArrayBody(response)) {
          // Fallback: body is array directly
          mapsData = response.body;
        } else {
          console.error("[MapShowcase] Invalid response format:", response);
          setError(
            `Failed to load maps. Response: ${JSON.stringify(response)}`
          );
          return;
        }

        console.log("[MapShowcase] Maps loaded:", mapsData.length);
        setMaps(mapsData);
      } catch (err: unknown) {
        console.error("[MapShowcase] Error fetching maps:", err);
        setError(err instanceof Error ? err.message : "Failed to load maps");
      } finally {
        setLoading(false);
      }
    }

    fetchTopMaps();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border-2 border-black bg-gray-100 aspect-video animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-black p-8 bg-red-50">
        <p className="text-red-600 font-mono text-sm">Error: {error}</p>
      </div>
    );
  }

  if (maps.length === 0) {
    return (
      <div className="border-2 border-black p-8 bg-gray-50">
        <p className="text-gray-600 font-mono text-sm">No maps available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {maps.map((map, index) => (
        <div key={map.map_id} className="h-full">
          <Reveal width="100%" delay={0.1 * index}>
            <MapCard map={map} />
          </Reveal>
        </div>
      ))}
    </div>
  );
}
