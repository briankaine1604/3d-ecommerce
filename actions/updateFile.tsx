"use server";
import { db } from "@/lib/firebase-app";
import { doc, setDoc } from "firebase/firestore";

export async function addOrUpdateFileById(fileId: string, data: any) {
  try {
    if (!fileId) throw new Error("No fileId provided");

    const docRef = doc(db, "files", fileId);
    await setDoc(docRef, data, { merge: true });

    console.log("Document successfully written!");
    return { id: fileId, ...data, success: "Document successfully written!" };
  } catch (error) {
    console.error("Error writing document:", error);
    return { error: "Failed to write document!" };
  }
}
