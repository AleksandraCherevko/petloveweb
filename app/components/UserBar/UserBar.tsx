// components/UserBar/UserBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/app/lib/store/auth";
import css from "./UserBar.module.css";

interface UserBarProps {
  onClick?: () => void;
}

export default function UserBar({ onClick }: UserBarProps) {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;
  return (
    <Link href="/profile" onClick={onClick} className={css.userLink}>
      <span className={css.userName}>{user.name || user.email}</span>
      <Image
        src={user.avatar || "/images/avatar.jpg"} 
        alt="User avatar"
        className={css.userAvatar}
        width={20}
        height={20}
      />
    </Link>
  );
}
