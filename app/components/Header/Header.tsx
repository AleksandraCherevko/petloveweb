"use client";

import css from "./Header.module.css";
import Nav from "../Nav/Nav";
import Container from "../Container/Container";
import Link from "next/link";
import AuthNav from "../AuthNav/AuthNav";
import { useState, useEffect } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import UserNav from "../UserNav/UserNav";
import { useAuthStore } from "@/app/lib/store/auth";
import UserBarIcon from "../UserBarIcon/UserBarIcon";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/home";
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isHydrated, hydrateUser } = useAuthStore();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    if (!isHydrated) {
      void hydrateUser();
    }
  }, [isHydrated, hydrateUser]);

  const authContent = !isHydrated ? null : isAuthenticated ? (
    <UserNav isHome={isHome} />
  ) : (
    <AuthNav isHome={isHome} />
  );

  return (
    <header className={clsx(css.header, isHome && css.headerHome)}>
      <Container>
        <div className={css.headerContainer}>
          <div className={css.headerLogoWrapper}>
            <div className={css.headerLogo}>
              <Link href="/home">
                <svg
                  className={clsx(css.logoIcon, isHome && css.logoIconHome)}
                  width="76"
                  height="20"
                >
                  <use
                    href={
                      isHome
                        ? "/symbol-defs.svg#icon-logo-home"
                        : "/symbol-defs.svg#icon-logo-desktop"
                    }
                  />
                </svg>
              </Link>
            </div>
            <div
              className={clsx(
                css.headerNavContainer,
                isHome && css.headerNavContainerHome,
              )}
            >
              <Nav isHome={isHome} />
            </div>
          </div>
          <div className={css.authWrapperMobMenu}>
            <div className={css.authWrapper}>{authContent}</div>
            <div className={css.headerMobMenuUserBar}>
              {isAuthenticated && (
                <div
                  className={clsx(
                    css.headerMobMenuUserBarPhoto,
                    user?.avatar && css.headerMobMenuUserBarPhotoHasAvatar,
                  )}
                >
                  <Link href="/profile">
                    <UserBarIcon />
                  </Link>
                </div>
              )}

              {/* MOBILE MENU */}
              <div className={css.mobileMenu}>
                <button
                  className={clsx(
                    css.mobMenuOpenBtn,
                    isHome && css.mobMenuOpenBtnHome,
                  )}
                  type="button"
                  onClick={() => setMenuOpen(true)}
                >
                  <svg
                    className={clsx(
                      css.burgerIcon,
                      isHome && css.burgerIconHome,
                    )}
                    width="32"
                    height="32"
                  >
                    <use
                      href={
                        isHome
                          ? "/symbol-defs.svg#icon-burger-btn-home"
                          : "/symbol-defs.svg#icon-burger-btn"
                      }
                    />
                  </svg>
                </button>
              </div>
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
