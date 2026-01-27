import css from "./Nav.module.css";
import Link from "next/link";


export default function Nav() {
  return (
    <>
      <div className={css.navListContainer}>
        <ul className={css.navList}>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/notices">Find pet</Link>
          </li>
          <li>
            <Link href="/friends">Our friends</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
