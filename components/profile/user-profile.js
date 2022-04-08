import UserAvatar from "./user-avatar";

function UserBackground({ user }) {
  return <div>{user && <UserAvatar user={user} />}</div>;
}

export default UserBackground;
