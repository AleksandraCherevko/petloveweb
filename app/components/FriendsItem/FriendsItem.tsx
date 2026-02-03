import { Friend } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import css from "./FriendsItem.module.css";

type Props = { item: Friend };

const FriendsItem = ({ item }: Props) => {
  const openDay = item.workDays?.find((day) => day.isOpen);
  return (
    <li className={css.friendsListItem}>
      <div className={css.friendsListItemScheduleWrapper}>
        <p className={css.friendsListItemSchedule}>
          {openDay ? `${openDay.from} – ${openDay.to}` : "Day and night"}
        </p>
      </div>
      <div className={css.friendsListItemContent}>
        <Image
          className={css.friendsListItemImg}
          src={item.imageUrl}
          alt={item.title}
          width={80}
          height={80}
        />
        <div className={css.friendsListItemContentText}>
          <p className={css.friendsListItemTitle}>{item.title}</p>
          <div className={css.friendsListItemContentTextWrapper}>
            {item.email && (
              <Link
                className={css.friendsListItemLink}
                href={`mailto:${item.email}`}
              >
                <span className={css.friendsListItemText}> Email:</span>
                {item.email}
              </Link>
            )}
            {item.address && item.addressUrl && (
              <Link
                className={css.friendsListItemLink}
                href={item.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={css.friendsListItemText}> Address:</span>{" "}
                {item.address}
              </Link>
            )}
            {!item.address && item.url && (
              <Link
                className={css.friendsListItemLink}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={css.friendsListItemText}> Address:</span>{" "}
                website only
              </Link>
            )}

            {item.phone ? (
              <Link
                className={css.friendsListItemLink}
                href={`tel:${item.phone}`}
              >
                <span className={css.friendsListItemText}> Phone: </span>
                {item.phone}
              </Link>
            ) : (
              <p>
                <span className={css.friendsListItemText}>Phone: </span>
                <span className={css.friendsListItemLink}>email only</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default FriendsItem;
