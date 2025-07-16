"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploding, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  optional validation
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file.");
        return false;
      }

      if (file.size > 100 * 1024 * 1024) {
        setError("Video size should be less than 100MB.");
        return false;
      }
    }
  };


const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];


    if (!file || validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
     const authRes =  await fetch('/api/auth/imagekit-auth');

     const {signature,expire,token} = authRes.json();


    const response = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature,
          expire,
         token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent))
                    }
                }
    });

    onSuccess(response);


    } catch (error) {
        console.log(error);
    } finally{}
        setUploading(false)
}
  }
  

  return (
    <>
      <input type="file"
       accept={fileType === "image" ? "image/*" : "video/*"}
       onChange={handleFileChange}
    //   ref={fileInputRef} />
    />
      
     {upload && (
        <span>Loding ...</span>
     )}

      {/* <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />
      Upload progress: <progress value={progress} max={100}></progress> */}
    </>
  );
};

export default FileUpload;
