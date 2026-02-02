import css from "./AuthNav.module.css";
import Link from "next/link";

interface AuthNavProps {
  onClose?: () => void;
}

export default function AuthNav({ onClose }: AuthNavProps) {
  return (
    <nav className={css.authNavContainer}>
      <ul className={css.authNavList}>
       
          <li className={css.authNavListItem}>
            <Link
              className={css.authNavListLink}
              href="/login"
              onClick={onClose}
            >
              log in
            </Link>
          </li>
          <li className={css.authNavListItem}>
            <Link
              className={css.authNavListLink}
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
