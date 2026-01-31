import { getFriends } from "../lib/api";
import FriendsList from "../components/FriendsList/FriendsList";
import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import css from "./page.module.css";

const Friends = async () => {
  const friends = await getFriends();

  return (
    <div className={css.friendPageContainer}>
      <Container>
        <Title as="h2" className={css.friendPageTitle}>
          Our friends
        </Title>
        {friends.length > 0 && <FriendsList friends={friends} />}
      </Container>
    </div>
  );
};

export default Friends;
