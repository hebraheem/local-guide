"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import { DEFAULT_AVATAR_URL } from "@/constant/variables";

const ProfileImage = ({ user }: { user: User|undefined }) => {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    const objectUrl = URL.createObjectURL(uploadedFile);
    setFileUrl(objectUrl);
    const formData = new FormData();
    formData.append("avatar", uploadedFile);
  };

  return (
    <div className="h-32 w-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center text-white text-4xl font-bold">
      <Image
        src={fileUrl ?? user?.profile?.avatarUrl ?? DEFAULT_AVATAR_URL}
        alt="Avatar"
        width={124}
        height={124}
        className="rounded-2xl"
        onClick={handleClick}
      />
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onChange={handleFileUpload}
      />
    </div>
  );
};
export default ProfileImage;
