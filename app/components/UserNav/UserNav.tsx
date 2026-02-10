"use client";

import clsx from "clsx";
import css from "./UserNav.module.css";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";

interface UserNavProps {
  isHome?: boolean;
  onClose?: () => void;
}

export default function UserNav({ isHome, onClose }: UserNavProps) {
  return (
    <nav className={clsx(css.authNavContainer, isHome && css.authNavHome)}>
      <ul className={css.userNavList}>
        <li className={css.userBar}>
          <UserBar onClick={onClose} />
        </li>
        <li>
          <LogOutBtn />
        </li>
      </ul>
    </nav>
  );
}
