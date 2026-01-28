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
    <li>
      <Title as="h3">{item.title}</Title>
      <Image src={item.imgUrl} alt={item.title} className={css.cardImage} />
      <p>{item.text}</p>
      <p>{new Date(item.date).toLocaleDateString()}</p>
      <Link
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={css.readMore}
      >
        Read more
      </Link>
    </li>
  );
};

export default NewsItem;
