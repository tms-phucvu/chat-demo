import { Button } from "@/components/ui/button";
import { formatVoiceTime } from "@/features/chat/utils/date.utils";

type VoiceRecordingControlsProps = {
  isRecording: boolean;
  isUploading: boolean;
  seconds: number;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => Promise<void>;
};

export function VoiceRecordingControls({
  isRecording,
  isUploading,
  seconds,
  isPaused,
  onPause,
  onResume,
  onStop,
}: VoiceRecordingControlsProps) {
  if (!isRecording && !isUploading) return null;

  if (isUploading)
    return (
      <div className="border-border bg-background/80 flex items-center gap-2 border-t px-4 py-2">
        <div>Uploading...</div>
      </div>
    );

  return (
    <div className="border-border bg-background/80 flex items-center gap-2 border-t px-4 py-2">
      <span className="text-red-500 font-mono flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        {formatVoiceTime(seconds)}
      </span>

      {!isPaused ? (
        <Button type="button" onClick={onPause}>
          Pause
        </Button>
      ) : (
        <Button type="button" onClick={onResume}>
          Resume
        </Button>
      )}

      <Button type="button" onClick={onStop} disabled={isUploading}>
        Stop
      </Button>
    </div>
  );
}
