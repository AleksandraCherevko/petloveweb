import css from "./Header.module.css";
import Nav from "../Nav/Nav";
import Container from "../Container/Container";
import Link from "next/link";
import AuthNav from "../AuthNav/AuthNav";

export default function Header() {
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
      </Container>
    </header>
  );
}
