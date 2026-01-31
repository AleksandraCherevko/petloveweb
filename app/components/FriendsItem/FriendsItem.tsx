import { Friend } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";

type Props = { item: Friend };

const FriendsItem = ({ item }: Props) => {
  const openDay = item.workDays?.find((day) => day.isOpen);
  return (
    <li>

      <p>{openDay ? `${openDay.from} – ${openDay.to}` : "Day and night"}</p>
      <Image
        src={item.imageUrl}
        alt={item.title}
        priority
        width={80}
        height={80}
      />
      <p>{item.title}</p>
      {item.email && (
        <p>
          <Link href={`mailto:${item.email}`}>Email: {item.email}</Link>
        </p>
      )}
      {item.address && item.url && (
        <p>
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            Address: website only
          </Link>
        </p>
      )}
      <p>
        {item.phone ? (
          <Link href={`tel:${item.phone}`}>Phone: {item.phone}</Link>
        ) : (
          <span>Phone: email only</span>
        )}
      </p>
    </li>
  );
};

export default FriendsItem;
