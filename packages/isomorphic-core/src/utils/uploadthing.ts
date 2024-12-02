import { generateReactHelpers, generateUploadButton, generateUploadDropzone, generateUploader } from "@uploadthing/react";
import type { OurFileRouter } from "../../../../apps/pulse-board/src/app/api/uploadthing/core";

export const Uploader = generateUploader<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();