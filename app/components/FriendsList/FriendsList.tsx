import { Friend } from "@/app/lib/api";
import FriendsItem from "../FriendsItem/FriendsItem";
import css from './FriendsList.module.css'

type Props = {
  friends: Friend[];
};

const FriendsList = ({ friends }: Props) => {
  return (
    <ul className={css.friendsList}>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} item={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
