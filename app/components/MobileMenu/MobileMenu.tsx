"use client";

import css from "./MobileMenu.module.css";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserCard/UserCard";
import { useAuthStore } from "@/app/lib/store/auth";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <div
        className={`${css.backdrop} ${isOpen ? css.show : ""}`}
        onClick={onClose}
      />
      <div className={`${css.mobileMenu} ${isOpen ? css.isOpen : ""}`}>
        <button onClick={onClose} className={css.mobileMenuNavigationBtn}>
          <svg className={css.mobileMenuCloseBtnIcon} width="24" height="24">
            <use href="/symbol-defs.svg#icon-cross-black" />
          </svg>
        </button>
        <div className={css.mobMenuAuthNavContainer}>
          <Nav />

          <div className={css.mobMenuBottom}>
            {isAuthenticated ? (
              <UserNav onClose={onClose} />
            ) : (
              <AuthNav onClose={onClose} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
