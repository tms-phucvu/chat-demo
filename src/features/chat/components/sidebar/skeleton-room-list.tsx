export default function SkeletonRoomList() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2 animate-pulse"
        >
          <div className="h-8 w-8 rounded-full bg-muted-foreground/20" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
            <div className="h-3 w-32 rounded bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
