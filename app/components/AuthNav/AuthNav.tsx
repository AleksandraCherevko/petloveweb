import css from "./AuthNav.module.css";
import Link from "next/link";

export default function AuthNav() {
  return (
    <div className={css.authNavContainer}>
      <ul className={css.authNavList}>
        <li className={css.authNavListItem}>
          <Link href="/login">log in</Link>
        </li>
        <li className={css.authNavListItem}>
          <Link href="/register">register</Link>
        </li>
      </ul>
    </div>
  );
}
