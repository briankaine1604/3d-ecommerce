"use server";
import { db } from "@/lib/firebase-app";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteFileById(fileId: string) {
  try {
    if (!fileId) throw new Error("No fileId provided");

    const docRef = doc(db, "files", fileId);
    await deleteDoc(docRef);

    console.log("Document successfully deleted!");
    return { success: "Document successfully deleted!" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { error: "Failed to delete document!" };
  }
}
