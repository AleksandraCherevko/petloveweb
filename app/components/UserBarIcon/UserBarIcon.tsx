"use client";

import Image from "next/image";
import { useAuthStore } from "@/app/lib/store/auth";
import css from "./UserBarIcon.module.css";
import clsx from "clsx";

interface UserBarIconProps {
  className?: string;
}

export default function UserBarIcon({ className }: UserBarIconProps) {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <Image
      src={user.avatar || "/images/avatar.jpg"}
      alt="User avatar"
      width={20}
      height={20}
      className={clsx(css.userBarImg, className)}
    />
  );
}
