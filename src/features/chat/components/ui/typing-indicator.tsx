export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-2xl rounded-bl-sm px-3 py-2 text-xs">
        <span className="inline-flex gap-1 h-6 items-center">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:-0.2s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:0.2s]" />
        </span>
      </div>
    </div>
  );
}
