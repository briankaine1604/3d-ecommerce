"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { Progress } from "./ui/progress";

export const FileUpload = ({
  onUpload,
  value,
  setUploading,
}: {
  onUpload: (url: string) => void;
  value: string[];
  setUploading: (uploading: boolean) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setUploading(true);
      setProgress(0);

      try {
        const data = new FormData();
        data.append("file", selectedFile);

        const res = await axios.post("/api/upload", data, {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        });

        if (res.status !== 200) throw new Error(res.statusText);

        const result = res.data;

        onUpload(result.downloadURL);
      } catch (error) {
        // console.log(error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-lg font-semibold">File Upload</h1>
      <input type="file" onChange={handleFileChange} className="" />
      {progress > 0 && <div>Upload Progress: {progress}%</div>}
      <Progress value={progress} />
      <div>
        {value.length > 0 &&
          value.map((url) => (
            <div
              key={url}
              className="relative h-[100px] w-[100px] rounded-md overflow-hidden"
            >
              <Image fill className="object-cover" src={url} alt="Image" />
            </div>
          ))}
      </div>
    </div>
  );
};
