import Image from "next/image";
import type { WikiImage } from "@/features/floorzero/types";

/**
 * Pixel-art friendly image in a fixed-aspect box (no layout shift).
 * `ratio="natural"` uses the image's width/height when given (else square);
 * otherwise pass a CSS aspect-ratio such as "4 / 3".
 */
export function WikiImg({
  image,
  ratio = "natural",
  sizes,
  priority,
  className = "",
  checker = true,
}: {
  image: WikiImage;
  ratio?: "natural" | string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  checker?: boolean;
}) {
  const aspect =
    ratio === "natural"
      ? image.width && image.height
        ? `${image.width} / ${image.height}`
        : "1 / 1"
      : ratio;
  return (
    <div
      className={`relative w-full overflow-hidden ${checker ? "fzw-checker" : ""} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 320px, 100vw"}
        priority={priority}
        className="object-contain"
        style={{
          imageRendering: image.pixelated === false ? "auto" : "pixelated",
        }}
      />
    </div>
  );
}
