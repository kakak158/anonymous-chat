import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function addMessage(text: string) {
  if (!text.trim()) return; // ignore empty messages
  await addDoc(collection(db, "messages"), {
    text,
    createdAt: serverTimestamp(),
  });
}
