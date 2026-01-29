export const ChatRoomEmpty = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-sm text-muted-foreground">
      <p className="font-medium">Select a conversation to get started</p>
      <p className="max-w-xs text-xs">
        Choose a chat from the list on the left to view messages and start
        replying.
      </p>
    </div>
  );
};
