import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/user.type";

const userConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore: (user) => user,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as UserProfile,
};

const userRef = (uid: string) =>
  doc(db, "users", uid).withConverter(userConverter);

export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  const userSnap = await getDoc(userRef(uid));
  return userSnap.exists() ? userSnap.data() : null;
};

export const createUserProfile = async (user: User): Promise<UserProfile> => {
  const profile: UserProfile = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
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
