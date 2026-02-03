import Container from "../components/Container/Container";
import Title from "../components/Title/Title";
import css from "./page.module.css";
export default function Notices() {
  return (
    <div className={css.noticesPageContainer}>
      <Container>
        <Title as="h2" className={css.noticesPageTitle}>
          Find your favorite pet
        </Title>
      </Container>
    </div>
  );
}
