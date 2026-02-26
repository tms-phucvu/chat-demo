"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { UploadMedia } from "@/types/cloudinary.types";
import { useEffect } from "react";

interface MediaViewProps {
  media: UploadMedia | null;
  onClose: () => void;
}

export function MediaView({ media, onClose }: MediaViewProps) {
  useEffect(() => {
    if (media) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [media]);

  if (!media) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop blur background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white pointer-events-auto cursor-pointer"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </button>

      {/* Container for media */}
      <div
        className="relative z-10 flex h-full w-full items-center justify-center p-4 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === "image" && (
          <div className="relative h-full w-full max-h-[90vh] max-w-[90vw] pointer-events-auto">
            <Image
              src={media.url}
              alt={media.url}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        )}

        {media.type === "video" && (
          <div className="relative h-full w-full max-h-[90vh] max-w-[90vw] pointer-events-auto">
            <video
              src={media.url}
              controls
              autoPlay
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
