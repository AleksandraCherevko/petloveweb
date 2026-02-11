// components/UserBar/UserBar.tsx
"use client";

import Link from "next/link";

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
      <div className={css.userAvatarIcon}>
        <svg className={css.userIcon} width="20" height="20">
          <use href="/symbol-defs.svg#icon-user" />
        </svg>
      </div>
      <span className={css.userName}>{user.name || user.email}</span>
    </Link>
  );
}
