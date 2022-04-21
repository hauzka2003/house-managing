import { motion } from "framer-motion";
import AvatarUser from "../icons/avatar";
import FriendNotification from "./notification/friend-noti";
import styles from "./notifications.module.css";

function Notifications({ notifications, setNotifications }) {
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className={styles.container}>
      {notifications.map((notification) => {
        return (
          notification.type === "friend" && (
            <FriendNotification
              notification={notification}
              key={notification.id}
              removeNotification={removeNotification}
            />
          )
        );
      })}
    </div>
  );
}

export default Notifications;
