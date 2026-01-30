import { New } from "@/app/lib/api";
import NewsItem from "../NewsItem/NewsItem";
import css from "./NewsList.module.css";

type Props = { news: New[] };

const NewsList = ({ news }: Props) => {
  return (
    <section className={css.newsListContainer}>
      <ul className={css.newsList}>
        {news.map((item: New) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default NewsList;
