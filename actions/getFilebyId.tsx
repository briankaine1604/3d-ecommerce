"use server";
import { ProductType } from "@/constants";
import { db } from "@/lib/firebase-app";
import { doc, getDoc } from "firebase/firestore";

export async function getFileById(fileId: string) {
  try {
    const docRef = doc(db, "files", fileId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as Omit<ProductType, "id">;
      return {
        id: docSnapshot.id,
        ...data,
      };
    } else {
      console.error("No such document!");
      return { error: "Document not found!" };
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return { error: "Failed to fetch document" };
  }
}
