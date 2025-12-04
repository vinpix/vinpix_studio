import React, { useState, useEffect } from 'react';
import { getPresignedUrl } from '@/lib/smartChatApi';
import { Loader2, AlertCircle } from 'lucide-react';

interface SecureImageProps {
  storageKey?: string;
  src?: string;
  alt: string;
  className?: string;
}

export function SecureImage({ storageKey, src, alt, className }: SecureImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(src || null);
  const [loading, setLoading] = useState(!src && !!storageKey);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchUrl = async () => {
      if (!storageKey || src) return; // If direct src provided (blob), use it
      
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
  }, [storageKey, src]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
        <AlertCircle size={24} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={className}
      loading="lazy"
    />
  );
}

