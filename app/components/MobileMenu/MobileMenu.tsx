"use client";

import css from "./MobileMenu.module.css";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import { useAuthStore } from "@/app/lib/store/authStore";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated } = useAuthStore();
  return (
    <Container>
      <div className={`${css.mobileMenu} ${isOpen ? css.isOpen : ""}`}>
        <div>
          <button onClick={onClose} className={css.mobileMenuNavigationBtn}>
            <svg className={css.mobileMenuCloseBtnIcon} width="24" height="24">
              <use href="/symbol-defs.svg#icon-cross" />
            </svg>
          </button>
        </div>
        <Nav />
        {isAuthenticated ? (
          <UserNav onClose={onClose} />
        ) : (
          <AuthNav onClose={onClose} />
        )}
      </div>
    </Container>
  );
}
