import type { ChatMessage, ChatRoom, ChatUser } from "../types/chat.types";
import { CHAT_CURRENT_USER_ID } from "../constants/chat.constants";

const users: ChatUser[] = [
  { id: CHAT_CURRENT_USER_ID, name: "You", avatarUrl: "" },
  { id: "u_js", name: "Jacquenetta Slowgrave", avatarUrl: "" },
  { id: "u_np", name: "Nickola Peever", avatarUrl: "" },
  { id: "u_fh", name: "Farand Hume", avatarUrl: "" },
  { id: "u_op", name: "Ossie Peasey", avatarUrl: "" },
  { id: "u_hn", name: "Hall Negri", avatarUrl: "" },
];

const rooms: ChatRoom[] = [
  {
    id: "r_js",
    title: "Jacquenetta Slowgrave",
    participantIds: [CHAT_CURRENT_USER_ID, "u_js"],
    unreadCount: 8,
    lastMessagePreview: "Great! Looking forward to it. See you later!",
    lastMessageAt: "2026-01-27T09:50:00.000Z",
  },
  {
    id: "r_np",
    title: "Nickola Peever",
    participantIds: [CHAT_CURRENT_USER_ID, "u_np"],
    unreadCount: 2,
    lastMessagePreview:
      "Sounds perfect! I've been wanting to try that place. See you there!",
    lastMessageAt: "2026-01-27T09:20:00.000Z",
  },
  {
    id: "r_fh",
    title: "Farand Hume",
    participantIds: [CHAT_CURRENT_USER_ID, "u_fh"],
    unreadCount: 0,
    lastMessagePreview: "How about 7 PM at the new Italian place downtown?",
    lastMessageAt: "2026-01-26T18:10:00.000Z",
  },
  {
    id: "r_hn",
    title: "Hall Negri",
    participantIds: [CHAT_CURRENT_USER_ID, "u_hn"],
    unreadCount: 0,
    lastMessagePreview: "No worries at all! I’ll grab a table and wait for you.",
    lastMessageAt: "2026-01-25T10:05:00.000Z",
  },
];

const messagesByRoomId: Record<string, ChatMessage[]> = {
  r_js: [
    {
      id: "m_js_sys_today",
      kind: "system",
      roomId: "r_js",
      text: "Today",
      createdAt: "2026-01-27T00:00:00.000Z",
    },
    {
      id: "m_js_1",
      kind: "user",
      roomId: "r_js",
      senderId: "u_js",
      text: "Hey! Are we still on for later?",
      createdAt: "2026-01-27T09:40:00.000Z",
    },
    {
      id: "m_js_2",
      kind: "user",
      roomId: "r_js",
      senderId: CHAT_CURRENT_USER_ID,
      text: "Yep — same plan as yesterday.",
      createdAt: "2026-01-27T09:41:00.000Z",
    },
    {
      id: "m_js_3",
      kind: "user",
      roomId: "r_js",
      senderId: "u_js",
      text: "Great! Looking forward to it. See you later!",
      createdAt: "2026-01-27T09:50:00.000Z",
    },
  ],
  r_np: [
    {
      id: "m_np_sys_today",
      kind: "system",
      roomId: "r_np",
      text: "Today",
      createdAt: "2026-01-27T00:00:00.000Z",
    },
    {
      id: "m_np_1",
      kind: "user",
      roomId: "r_np",
      senderId: "u_np",
      text: "Want to try that new place?",
      createdAt: "2026-01-27T09:10:00.000Z",
    },
    {
      id: "m_np_2",
      kind: "user",
      roomId: "r_np",
      senderId: CHAT_CURRENT_USER_ID,
      text: "Absolutely — what time works?",
      createdAt: "2026-01-27T09:12:00.000Z",
    },
    {
      id: "m_np_3",
      kind: "user",
      roomId: "r_np",
      senderId: "u_np",
      text: "Sounds perfect! I've been wanting to try that place. See you there!",
      createdAt: "2026-01-27T09:20:00.000Z",
    },
  ],
  r_fh: [
    {
      id: "m_fh_sys_yesterday",
      kind: "system",
      roomId: "r_fh",
      text: "Yesterday",
      createdAt: "2026-01-26T00:00:00.000Z",
    },
    {
      id: "m_fh_1",
      kind: "user",
      roomId: "r_fh",
      senderId: "u_fh",
      text: "How about 7 PM at the new Italian place downtown?",
      createdAt: "2026-01-26T18:10:00.000Z",
    },
  ],
  r_hn: [
    {
      id: "m_hn_sys_two_days",
      kind: "system",
      roomId: "r_hn",
      text: "2 days ago",
      createdAt: "2026-01-25T00:00:00.000Z",
    },
    {
      id: "m_hn_1",
      kind: "user",
      roomId: "r_hn",
      senderId: "u_hn",
      text: "Drive safe!",
      createdAt: "2026-01-25T10:00:00.000Z",
    },
    {
      id: "m_hn_2",
      kind: "user",
      roomId: "r_hn",
      senderId: CHAT_CURRENT_USER_ID,
      text: "On my way. Might be a few minutes late.",
      createdAt: "2026-01-25T10:03:00.000Z",
    },
    {
      id: "m_hn_3",
      kind: "user",
      roomId: "r_hn",
      senderId: "u_hn",
      text: "No worries at all! I’ll grab a table and wait for you.",
      createdAt: "2026-01-25T10:05:00.000Z",
    },
  ],
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

export const chatMock = {
  getUsers(): ChatUser[] {
    return clone(users);
  },
  getRooms(): ChatRoom[] {
    return clone(rooms).sort((a, b) =>
      (b.lastMessageAt ?? "").localeCompare(a.lastMessageAt ?? "")
    );
  },
  getRoomById(roomId: string): ChatRoom | undefined {
    return clone(rooms).find((r) => r.id === roomId);
  },
  getMessagesByRoomId(roomId: string): ChatMessage[] {
    return clone(messagesByRoomId[roomId] ?? []).sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );
  },
};


