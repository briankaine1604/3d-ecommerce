import { storage } from "@/lib/firebase-app";
import { deleteObject, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the fileRef
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { success: false, message: "No file reference provided" },
        { status: 400 }
      );
    }

    // Create a reference to the file to delete
    const fileRef = ref(storage, body);

    // Delete the file
    await deleteObject(fileRef);
    console.log("File deleted successfully");

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("File deletion error:", error);
    return NextResponse.json(
      { success: false, message: "File deletion failed" },
      { status: 500 }
    );
  }
}
