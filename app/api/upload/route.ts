import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

import { storage } from "@/lib/firebase-app";
import { createId } from "@paralleldrive/cuid2";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path to save the file, ensure it points to a valid location
    // const filePath = join(process.cwd(), "tmp", file.name);
    // const dirPath = dirname(filePath);

    // // Create the directory if it doesn't exist
    // await mkdir(dirPath, { recursive: true });

    // await writeFile(filePath, buffer);
    // console.log(`File saved to ${filePath}`);

    const fileRef = createId();
    const storageRef = ref(storage, fileRef);
    // Wait for the upload to complete
    const snapshot = await uploadBytes(storageRef, buffer);
    console.log("Uploaded a blob or file!");

    // Get the download URL after the upload completes
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(downloadURL);

    return NextResponse.json({
      success: true,
      fileRef,
      downloadURL,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { success: false, message: "File upload failed" },
      { status: 500 }
    );
  }
}
