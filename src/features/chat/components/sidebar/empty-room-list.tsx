import { MessageSquarePlus, Plus } from "lucide-react";

export default function EmptyRoomList() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 text-gray-500 dark:text-gray-400">
      <MessageSquarePlus className="w-16 h-16 mb-4 opacity-70" />
      <p className="text-lg font-medium mb-2">Danh sách trống</p>
      <p className="text-sm">
        {"Nhấn "}
        <span className="inline-flex items-center gap-1 border-2 rounded-full">
          <Plus size={14} />
        </span>
        {" ở trên để tìm bạn và bắt đầu cuộc trò chuyện"}
      </p>
    </div>
  );
}
