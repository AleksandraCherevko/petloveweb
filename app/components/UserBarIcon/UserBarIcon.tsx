"use client";

import { useAuthStore } from "@/app/lib/store/auth";
import css from "./UserBarIcon.module.css";

import Image from "next/image";

// interface UserBarIconProps {
//   className?: string;
// }

export default function UserBarIcon() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <div className={css.iconWrap}>
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name || "User avatar"}
          fill
          sizes="45px"
          className={css.avatar}
        />
      ) : (
        <div className={css.fallback}>
          <svg width="20" height="20">
            <use href="/symbol-defs.svg#icon-user" />
          </svg>
        </div>
      )}
    </div>
  );
}
