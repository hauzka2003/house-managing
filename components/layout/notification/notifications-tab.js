import styles from "./friend-request.module.css";
import { motion } from "framer-motion";

import FriendRequest from "./friend-request";

function NotificationsTabs({ notifications, setNotiModals }) {
  // useEffect(() => {
  //     getLastSeen(lastSeen);
  // }, [notifications]);
  const date = new Date();

  return (
    <>
      {notifications?.map((noti, index) => {
        return (
          noti?.type === "friend" && (
            <FriendRequest
              notification={noti}
              index={index}
              isLast={index === notifications?.length - 1}
              key={index}
              date={date}
              setNotiModals={setNotiModals}
            />
          )
        );
      })}
    </>
  );
}

export default NotificationsTabs;
