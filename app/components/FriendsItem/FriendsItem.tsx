import { Friend } from "@/app/lib/api";
import Link from "next/link";

type Props = { item: Friend };

const FriendsItem = ({ item }: Props) => {
  return (
    <li>
      <p>{item.imageUrl}</p>
      <p>{item.title}</p>
      <p>{item.title}</p>
      <Link href={`mailto:${item.email}`}>Email: {item.email}</Link>
      <Link href={item.url} target="_blank" rel="noopener noreferrer">
        Address: {item.address}
      </Link>
      <Link href={`tel:${item.phone}`}>Phone: {item.phone}</Link>
    </li>
  );
};

export default FriendsItem;
