import css from "./AuthNav.module.css";
import Link from "next/link";
import clsx from "clsx";

interface AuthNavProps {
  onClose?: () => void;
  isHome?: boolean;
}

export default function AuthNav({ onClose, isHome }: AuthNavProps) {
  return (
    <nav className={clsx(css.authNavContainer, isHome && css.authNavHome)}>
      <ul className={css.authNavList}>
        <li
          className={clsx(
            css.authNavListItem,
            isHome && css.authNavListItemHome,
          )}
        >
          <Link
            className={clsx(
              css.authNavListLink,
              css.loginbtn,
              isHome && css.authNavListLinkHome,
            )}
            href="/login"
            onClick={onClose}
          >
            log in
          </Link>
        </li>
        <li
          className={clsx(
            css.authNavListItem,
            isHome && css.authNavListItemHome,
          )}
        >
          <Link
            className={clsx(
              css.authNavListLink,
              css.registerbtn,
              isHome && css.authNavListLinkHome,
            )}
            href="/register"
            onClick={onClose}
          >
            register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
