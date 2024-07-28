"use server";

import { formSchema } from "@/app/settings/schema";
import { db } from "@/lib/firebase-app";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { z } from "zod";

export async function addFile(fileData: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(fileData);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  try {
    // Add createDate field with server timestamp
    const docRef = await addDoc(collection(db, "files"), {
      ...fileData,
      createdAt: serverTimestamp(),
    });

    const id = docRef.id;
    return { success: "Document created!", id };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to add document");
  }
}
