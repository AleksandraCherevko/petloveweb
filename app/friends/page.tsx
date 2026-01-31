import { getFriends } from "../lib/api";

const Friends = async () => {
  const friends = await getFriends();
  console.log("friends", friends);
  return (
    <div>
      <h1>Friends page</h1>
    </div>
  );
};

export default Friends;
