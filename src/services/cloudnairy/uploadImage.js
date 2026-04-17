import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@env";
console.log("CLOUDINARY_CLOUD_NAME:", CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_UPLOAD_PRESET:", CLOUDINARY_UPLOAD_PRESET);

export const uploadToCloudinary = async (file) => {
  console.log("Uploading file:", file);

  if (!file) return "";

  const formData = new FormData();

  formData.append("file", {
    uri: file,
    type: "image/jpeg",
    name: "upload.jpg",
  });

  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const data = await res.json();
  return data.secure_url;
};