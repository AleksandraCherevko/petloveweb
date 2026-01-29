import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import css from "./page.module.css";
import { getNews, New } from "../lib/api";
import NewsList from "../components/NewsList/NewsList";

const News = async () => {
  const news: New[] = await getNews();

  return (
    <div className={css.newsPageContainer}>
      <Container>
        <section>
          <Title as="h2">News</Title>
          {news.length > 0 && <NewsList news={news} />}
        </section>
      </Container>
    </div>
  );
};

export default News;
