"use client";

import css from "./MobileMenu.module.css";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import { useAuthStore } from "@/app/lib/store/auth";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

import clsx from "clsx";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <div
        className={`${css.backdrop} ${isOpen ? css.show : ""}`}
        onClick={onClose}
      />
      <div
        className={clsx(
          css.mobileMenu,
          isOpen && css.isOpen,
          isAuthenticated && css.profileMenu,
        )}
      >
        <button onClick={onClose} className={css.mobileMenuNavigationBtn}>
          <svg className={css.mobileMenuCloseBtnIcon} width="24" height="24">
            <use
              href={
                isAuthenticated
                  ? "/symbol-defs.svg#icon-cross-white"
                  : "/symbol-defs.svg#icon-cross-black"
              }
            />
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
          <LogOutBtn />
        </div>
      </div>
    </>
  );
}
