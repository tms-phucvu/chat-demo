"use client";

import { memo, useCallback } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UploadMedia } from "@/types/cloudinary.types";

interface MediaPreviewProps {
  mediaItems: UploadMedia[];
  onRemove: (index: number) => void;
  onAddMore: () => void;
  isUploading: boolean;
  maxItems?: number;
  className?: string;
}

function MediaPreviewComponent({
  mediaItems,
  onRemove,
  onAddMore,
  isUploading,
  maxItems = 8,
  className,
}: MediaPreviewProps) {
  const canAddMore = mediaItems.length < maxItems;

  const handleRemove = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove(index);
    },
    [onRemove],
  );

  if (mediaItems.length === 0 && !isUploading) return null;

  return (
    <div
      className={cn(
        "border-border bg-background/80 flex flex-wrap gap-2 border-t px-4 py-2 overflow-x-auto",
        className,
      )}
    >
      {mediaItems.map((media, index) => (
        <div key={index} className="group relative h-20 w-20 shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-muted/30">
            <Image
              src={media.thumbnail || media.url}
              alt="preview"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className={
              "absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity border-2 border-background/80"
            }
            onClick={handleRemove(index)}
          >
            <X size={16} />
          </Button>
        </div>
      ))}

      {canAddMore && (
        <button
          type="button"
          onClick={onAddMore}
          disabled={isUploading}
          className={cn(
            "flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-border transition-colors",
            "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isUploading && "cursor-not-allowed opacity-70",
          )}
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}

export const MediaPreview = memo(MediaPreviewComponent);
