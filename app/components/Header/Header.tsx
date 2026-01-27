"use client";

import css from "./Header.module.css";
import Nav from "../Nav/Nav";
import Container from "../Container/Container";
import Link from "next/link";
import AuthNav from "../AuthNav/AuthNav";
import { useState, useEffect } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
  return (
    <header>
      <Container>
        <div className={css.headerLogo}>
          <Link href="/">
            <svg className={css.logoIcon} width="105" height="28">
              <use href="/symbol-defs.svg#icon-logo-desktop"></use>
            </svg>
          </Link>
        </div>
        <Nav />
        <AuthNav />
        <div className={css.mobileMenu}>
          <button
            className={css.mobMenuOpenBtn}
            type="submit"
            onClick={() => setMenuOpen(true)}
          >
            <svg className={css.logoIcon} width="105" height="28">
              <use href="/symbol-defs.svg#icon-burger-btn"></use>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </Container>
    </header>
  );
}
