import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserInfo, UserProfile } from "@/types/user.type";
import { toUserInfo } from "@/features/chat/utils/user.utils";

/**
 * =========================
 * References
 * =========================
 */
const usersCol = collection(db, "users");

/**
 * =========================
 * Search helpers
 * =========================
 */
async function searchExactEmail(email: string): Promise<UserInfo[]> {
  const q = query(usersCol, where("emailLowercase", "==", email), limit(1));

  const snap = await getDocs(q);
  return snap.docs.map((d) => toUserInfo(d.data() as UserProfile));
}

async function searchEmailPrefix(prefix: string): Promise<UserInfo[]> {
  const q = query(
    usersCol,
    where("emailLowercase", ">=", prefix),
    where("emailLowercase", "<=", prefix + "\uf8ff"),
    limit(5),
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => toUserInfo(d.data() as UserProfile));
}

/**
 * =========================
 * Public search API
 * =========================
 */
export async function searchUserByEmailSmart(
  input: string,
): Promise<UserInfo[]> {
  const value = input.trim().toLowerCase();
  if (!value) return [];

  // exact email
  if (value.includes("@") && value.includes(".")) {
    return searchExactEmail(value);
  }

  // prefix search
  if (value.length >= 3) {
    return searchEmailPrefix(value);
  }

  return [];
}
