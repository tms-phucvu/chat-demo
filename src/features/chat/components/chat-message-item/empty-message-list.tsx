export default function EmptyMessageList() {
  return (
    <div className="flex justify-center py-10">
      <div className="max-w-xs text-center text-sm text-muted-foreground">
        <p className="text-6xl mb-6">👋</p>
        <p className="mb-1 font-medium">No messages yet</p>
        <p>Start the conversation by sending a message</p>
      </div>
    </div>
  );
}
