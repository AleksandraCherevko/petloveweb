import css from "./MobileMenu.module.css";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
        <AuthNav onClose={onClose} />
      </div>
    </Container>
  );
}
