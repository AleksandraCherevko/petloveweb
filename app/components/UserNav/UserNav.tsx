"use client";

import clsx from "clsx";
import css from "./UserNav.module.css";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";
import { useAuthStore } from "@/app/lib/store/auth";

interface UserNavProps {
  isHome?: boolean;
  onClose?: () => void;
}

export default function UserNav({ isHome, onClose }: UserNavProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return null;
  return (
    <nav className={clsx(css.authNavContainer, isHome && css.authNavHome)}>
      <ul className={css.userNavList}>
        <li className={`${css.userBar} user-bar`}>
          <LogOutBtn />
        </li>
        <li className={css.userBar}>
          <UserBar onClick={onClose} />
        </li>
      </ul>
    </nav>
  );
}
