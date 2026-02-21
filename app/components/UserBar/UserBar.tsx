"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/lib/store/auth";
import css from "./UserBar.module.css";
import Image from "next/image";

interface UserBarProps {
  onClick?: () => void;
}

export default function UserBar({ onClick }: UserBarProps) {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <Link
      href="/profile"
      onClick={onClick}
      className={`${css.userLink} user-link`}
    >
      <div className={css.userAvatarIcon}>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name || "User avatar"}
            width={40}
            height={40}
            className={css.userAvatarImg}
          />
        ) : (
          <svg className={css.userIcon} width="20" height="20">
            <use href="/symbol-defs.svg#icon-user" />
          </svg>
        )}
      </div>
      <span className={css.userName}>{user.name || user.email}</span>
    </Link>
  );
}
