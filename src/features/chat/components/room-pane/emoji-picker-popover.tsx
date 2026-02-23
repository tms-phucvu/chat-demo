"use client";

import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@emoji-mart/data";
import { useLocale } from "next-intl";

// Dynamic import to avoid SSR issues with emoji-mart
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="h-100 w-80 flex items-center justify-center bg-background border rounded-lg shadow-sm">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
});

interface EmojiPickerPopoverProps {
  onChange: (emoji: string) => void;
}

export default function EmojiPickerPopover({
  onChange,
}: EmojiPickerPopoverProps) {
  const locale = useLocale();
  // Define the emoji select handler with proper type
  const handleEmojiSelect = (emojiObject: { native: string }) => {
    onChange(emojiObject.native);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-200 aspect-square"
        >
          <SmilePlus size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        className="w-auto border-none shadow-2xl p-0 mb-4 z-50"
      >
        <Picker
          // Core functionality
          id="chat-emoji-picker"
          data={data}
          onEmojiSelect={handleEmojiSelect}
          theme="light"
          locale={locale}
          // Performance (Fixes scrolling lag)
          native={true} // Uses system fonts instead of images
          dynamicWidth={false} // Disables expensive layout re-calculations
          // Layout & Styling
          perLine={9}
          emojiSize={22}
          emojiButtonSize={32}
          // UI positions
          previewPosition="none"
          navPosition="bottom"
          skinTonePosition="search"
        />
      </PopoverContent>
    </Popover>
  );
}
