import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { UserInfo, UserProfile } from "@/types/user.type";

/**
 * =========================
 * Convert UserProfile to UserInfo
 * =========================
 */
function toUserInfo(user: UserProfile): UserInfo {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailLowercase: user.emailLowercase,
    avatarURL: user.avatarURL,
  };
}

/**
 * =========================
 * Firestore Converter
 * =========================
 */
const userConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore: (user) => {
    const { uid, ...data } = user;
    return data;
  },
  fromFirestore: (snap: QueryDocumentSnapshot) => ({
    uid: snap.id,
    ...(snap.data() as Omit<UserProfile, "uid">),
  }),
};

/**
 * =========================
 * References
 * =========================
 */
const usersCol = collection(db, "users").withConverter(userConverter);

const userRef = (uid: string) =>
  doc(db, "users", uid).withConverter(userConverter);

/**
 * =========================
 * Basic CRUD
 * =========================
 */
export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  const snap = await getDoc(userRef(uid));
  return snap.exists() ? snap.data() : null;
};

export const createUserProfile = async (user: User): Promise<UserProfile> => {
  const profile: UserProfile = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailLowercase: user.email?.toLowerCase() ?? null,
    avatarURL: user.photoURL,
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef(user.uid), profile);
  return profile;
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>,
): Promise<void> => {
  await updateDoc(userRef(uid), data);
};

export const syncUserProfile = async (user: User): Promise<UserProfile> => {
  const existing = await getUserProfile(user.uid);
  if (existing) return existing;
  return await createUserProfile(user);
};

/**
 * =========================
 * Search helpers
 * =========================
 */
async function searchExactEmail(email: string): Promise<UserInfo[]> {
  const q = query(usersCol, where("emailLowercase", "==", email), limit(1));

  const snap = await getDocs(q);
  return snap.docs.map((d) => toUserInfo(d.data()));
}

async function searchEmailPrefix(prefix: string): Promise<UserInfo[]> {
  const q = query(
    usersCol,
    where("emailLowercase", ">=", prefix),
    where("emailLowercase", "<=", prefix + "\uf8ff"),
    limit(5),
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => toUserInfo(d.data()));
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

/**
 * =========================
 * Get user info by id
 * =========================
 */
export const getUserById = async (
  uid: string
): Promise<UserInfo | null> => {
  const profile = await getUserProfile(uid);

  return profile ? toUserInfo(profile) : null;
};
