"use client";

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
    <svg className={clsx(css.userBarImg, className)} width="20" height="20">
      <use href="/symbol-defs.svg#icon-user" />
    </svg>
  );
}
