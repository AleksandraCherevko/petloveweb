import { Notice } from "@/app/lib/api";
import Image from "next/image";

type Props = {
  item: Notice;
};

const NoticesItem = ({ item }: Props) => {
  return (
    <li>
      <Image src={item.imgURL} width={287} height={178} alt={item.comment} />
      <p>{item.title}</p>
      <p>{item.popularity}</p>
      <p>Name: {item.name}</p>
      <p>Birthday: {item.birthday}</p>
      <p>Sex: {item.sex}</p>
      <p>Species: {item.species}</p>
      <p>Category{item.category}</p>
      <p>{item.comment}</p>
      <p>{item.price}</p>
    </li>
  );
};

export default NoticesItem;
