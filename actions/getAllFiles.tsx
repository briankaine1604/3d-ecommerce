"use server";
import { db } from "@/lib/firebase-app";
import { collection, getDocs } from "firebase/firestore";

export async function getAllFiles() {
  try {
    const querySnapshot = await getDocs(collection(db, "files"));
    const files: any = [];

    querySnapshot.forEach((doc) => {
      files.push({ id: doc.id, ...doc.data() });
    });

    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to fetch files");
  }
}
