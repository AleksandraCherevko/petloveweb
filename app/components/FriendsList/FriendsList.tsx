import { Friend } from "@/app/lib/api";
import FriendsItem from "../FriendsItem/FriendsItem";

type Props = {
  friends: Friend[];
};

const FriendsList = ({ friends }: Props) => {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} item={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
