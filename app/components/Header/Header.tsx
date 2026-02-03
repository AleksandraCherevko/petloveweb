"use client";

import css from "./Header.module.css";
import Nav from "../Nav/Nav";
import Container from "../Container/Container";
import Link from "next/link";
import AuthNav from "../AuthNav/AuthNav";
import { useState, useEffect } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import UserNav from "../UserNav/UserNav";
import { useAuthStore } from "@/app/lib/store/authStore";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/home";
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
  return (
    <header className={clsx(css.header, isHome && css.headerHome)}>
      <Container>
        <div className={css.headerContainer}>
          <div className={css.headerLogoWrapper}>
            <div className={css.headerLogo}>
              <Link href="/">
                <svg className={css.logoIcon} width="76" height="20">
                  <use href="/symbol-defs.svg#icon-logo-desktop"></use>
                </svg>
              </Link>
            </div>
            <div className={css.headerNavContainer}>
              <Nav />
            </div>
          </div>
          <div className={css.authWrapperMobMenu}>
            <div className={css.authWrapper}>
              {isAuthenticated ? <UserNav /> : <AuthNav />}
            </div>
            <div className={css.mobileMenu}>
              <button
                className={css.mobMenuOpenBtn}
                type="submit"
                onClick={() => setMenuOpen(true)}
              >
                <svg className={css.burgerIcon} width="32" height="32">
                  <use href="/symbol-defs.svg#icon-burger-btn"></use>
                </svg>
              </button>
            </div>
          </div>
          {menuOpen && (
            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          )}
        </div>
      </Container>
    </header>
  );
}
