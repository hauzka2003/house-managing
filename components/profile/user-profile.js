import UserAvatar from "./user-avatar";

function UserBackground({ user }) {
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  );
}

export default UserBackground;
