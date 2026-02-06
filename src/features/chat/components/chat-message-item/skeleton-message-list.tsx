export default function SkeletonMessageList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex justify-start">
          <div className="max-w-xs space-y-2 rounded-2xl bg-muted/70 px-3 py-2 text-sm">
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
            <div className="h-3 w-32 rounded bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
