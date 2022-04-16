import UserAvatar from "./user-avatar";

function UserBackground({ user }) {
  return (
    <div>
      {user === "User not found" ? (
        <div>User not found</div>
      ) : (
        <UserAvatar user={user} />
      )}
    </div>
  );
}

export default UserBackground;
