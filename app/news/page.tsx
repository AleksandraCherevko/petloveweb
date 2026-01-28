import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import css from "./page.module.css";
import { getNews } from "../lib/api";


const News = async () => {
  const news = await getNews();
  console.log("news", news);
  return (
    <div className={css.newsPageContainer}>
      <Container>
        <Title as="h2">News</Title>
      </Container>
    </div>
  );
};

export default News;
