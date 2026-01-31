import { getFriends } from "../lib/api";
import FriendsList from "../components/FriendsList/FriendsList";
import Title from "../components/Title/Title";

const Friends = async () => {
  const friends = await getFriends();

  return (
    <section>
      <Title as="h2">Our friends</Title>
      {friends.length > 0 && <FriendsList friends={friends} />}
    </section>
  );
};

export default Friends;
