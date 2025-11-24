"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Play } from "lucide-react";
import type { Map } from "@/lib/types/map";
import { getMapDownloadUrls, getMapDetail } from "@/lib/mapApi";

interface MapCardProps {
  map: Map;
  className?: string;
}

export default function MapCard({ map, className = "" }: MapCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    map.preview_url || null
  );
  const [loadingPreview, setLoadingPreview] = useState(!map.preview_url);

  useEffect(() => {
    // Lazy load preview URL if not available
    if (!map.preview_url && map.map_id) {
      const loadPreview = async () => {
        try {
          setLoadingPreview(true);
          const response = await getMapDownloadUrls(map.map_id, true, 3600);

          // Handle both response formats
          let previewUrlFromResponse: string | null = null;

          if (response.statusCode === 200) {
            if (response.body?.preview?.url) {
              previewUrlFromResponse = response.body.preview.url;
            } else if ((response as any).preview?.url) {
              // Handle unwrapped format
              previewUrlFromResponse = (response as any).preview.url;
            }
          }

          if (previewUrlFromResponse) {
            setPreviewUrl(previewUrlFromResponse);
          } else {
            // Fallback: try getMapDetail which populates presigned preview_url if exists
            try {
              const detail = (await getMapDetail(map.map_id)) as any;
              const candidate =
                detail?.body?.preview_url ?? detail?.preview_url ?? null;
              if (candidate) {
                setPreviewUrl(candidate);
              }
            } catch {
              // ignore, will show No Preview
            }
          }
          setLoadingPreview(false);
        } catch (error) {
          console.error(
            `[MapCard] Error loading preview for ${map.map_id}:`,
            error
          );
          setLoadingPreview(false);
        }
      };

      // Load preview when card is visible (lazy load)
      // Use a ref-based approach with IntersectionObserver
      const cardElement = document.getElementById(`map-card-${map.map_id}`);

      if (cardElement && typeof IntersectionObserver !== "undefined") {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              loadPreview();
              observer.disconnect();
            }
          },
          { rootMargin: "100px" } // Start loading 100px before visible
        );

        observer.observe(cardElement);
        return () => observer.disconnect();
      } else {
        // Fallback: load immediately if observer not available or SSR
        loadPreview();
      }
    } else {
      setLoadingPreview(false);
    }
  }, [map.map_id, map.preview_url]);

  return (
    <div
      id={`map-card-${map.map_id}`}
      className={`border-2 border-black bg-white overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col ${className}`}
    >
      {/* Preview Image */}
      <div className="aspect-video w-full bg-gray-200 relative overflow-hidden">
        {loadingPreview ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="animate-pulse">
              <span className="text-gray-400 font-mono text-sm">
                Loading...
              </span>
            </div>
          </div>
        ) : previewUrl ? (
          <Image
            src={previewUrl}
            alt={map.title}
            fill
            className="object-cover"
            unoptimized
            loading="lazy"
            onError={() => {
              // If presigned URL fails (missing object / expired), fallback to No Preview
              setPreviewUrl(null);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 font-mono text-sm">No Preview</span>
          </div>
        )}
      </div>

      {/* Map Info */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-lg font-bold uppercase mb-2 line-clamp-2 flex-1">
          {map.title}
        </h4>
        <div className="flex items-center justify-between text-sm mt-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              <span className="font-mono">{map.play_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="font-mono">{map.likes_count || 0}</span>
            </div>
          </div>
          {map.creator_username && (
            <span className="text-xs opacity-60 font-mono">
              @{map.creator_username}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
