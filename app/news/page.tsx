import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import css from "./page.module.css";

export default function News() {
  return (
    <div className={css.newsPageContainer}>
      <Container>
        <Title as="h2">News</Title>
      </Container>
    </div>
  );
}
