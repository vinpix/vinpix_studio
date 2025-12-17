import React, { useState, useEffect } from "react";
import { getPresignedUrl } from "@/lib/smartChatApi";
import { Loader2, AlertCircle, Image as ImageIcon } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SecureImageProps {
  storageKey?: string;
  src?: string;
  alt: string;
  className?: string;
  /**
   * If true, disables lazy loading and loads image immediately
   * Useful for images that should always be visible (e.g., in modals)
   */
  eager?: boolean;
}

export function SecureImage({
  storageKey,
  src,
  alt,
  className,
  eager = false,
}: SecureImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(src || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Use intersection observer for lazy loading
  // Load images when they're 200px away from viewport
  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
    enabled: !eager, // Disable lazy loading if eager is true
  });

  useEffect(() => {
    let mounted = true;

    const fetchUrl = async () => {
      // Only fetch if:
      // 1. We have a storageKey (remote image)
      // 2. We don't already have a src (blob URL)
      // 3. The image is visible (or eager loading is enabled)
      // 4. We haven't already loaded it
      if (!storageKey || src || !isVisible || imageUrl) return;

      try {
        setLoading(true);
        const url = await getPresignedUrl(storageKey);
        if (mounted) {
          setImageUrl(url);
        }
      } catch (err) {
        console.error("Failed to load image", err);
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUrl();

    return () => {
      mounted = false;
    };
  }, [storageKey, src, isVisible, imageUrl]);

  // Error state
  if (error) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
      >
        <AlertCircle size={24} />
      </div>
    );
  }

  // Loading state - show when actively fetching URL
  if (loading) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    );
  }

  // Placeholder state - waiting to enter viewport
  if (!isVisible && !eager) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-gray-50 ${className}`}
        style={{ minHeight: "200px", minWidth: "200px" }}
      >
        <ImageIcon className="text-gray-300" size={32} />
      </div>
    );
  }

  // No URL available yet (should not happen in normal flow)
  if (!imageUrl) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <ImageIcon className="text-gray-300" size={24} />
      </div>
    );
  }

  // Image loaded and ready to display
  return (
    <div ref={containerRef} className="relative">
      <img src={imageUrl} alt={alt} className={className} loading="lazy" />
    </div>
  );
}
