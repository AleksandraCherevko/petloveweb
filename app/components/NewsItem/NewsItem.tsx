import { New } from "@/app/lib/api";
import css from "./NewsItem.module.css";
import Image from "next/image";
import Title from "../Title/Title";
import Link from "next/link";

type Props = {
  item: New;
};

const NewsItem = ({ item }: Props) => {
  return (
    <li className={css.newListItem}>
      <Image
        src={item.imgUrl}
        alt={item.title}
        className={css.newListImg}
        priority
        width={335}
        height={190}

      />
      <div className={css.newListContent}>
        <Title as="h3" className={css.newListTitle}>
          {item.title}
        </Title>

        <p className={css.newListAfterTitle}>{item.text}</p>
        <div className={css.newListWrapper}>
          <p className={css.newListDate}>
            {new Date(item.date).toLocaleDateString()}
          </p>
          <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={css.readMoreLink}
          >
            Read more
          </Link>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
