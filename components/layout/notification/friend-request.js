import styles from "./friend-request.module.css";
import { motion, useAnimation } from "framer-motion";
import AvatarUser from "../../icons/avatar";
import { useState, useEffect } from "react";
import TimeIcon from "../../icons/time";
import PeopleFillIcon from "../../icons/people-fill";
import ArrowForwardIcon from "../../icons/arrow-forward";
import { useRouter } from "next/router";

function FriendRequest({ notification, index, isLast, date, setNotiModals }) {
  const [lastSend, setLastSend] = useState(null);

  const backgroundAnimation = useAnimation();
  const iconAnimation = useAnimation();
  const router = useRouter();

  async function InitialHover() {
    await iconAnimation.start({ left: "-100%", transition: { duration: 0 } });
    await backgroundAnimation.start({ top: 0, transition: { duration: 0 } });
    backgroundAnimation.start({
      height: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
    iconAnimation.start({
      left: "50%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  }

  async function FinalHover() {
    backgroundAnimation.start({
      top: "100%",
      height: "0px",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
    iconAnimation.start({
      left: "200%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  }

  function getLastSeen(lastSeen) {
    const lastSeenDate = new Date(lastSeen);

    const diff = Math.floor((date - lastSeenDate) / 1000);
    const year = Math.floor(diff / 31536000);
    const months = Math.floor(diff / (60 * 60 * 24 * 30));
    const day = Math.floor(diff / 86400);
    const hour = Math.floor((diff % 86400) / 3600);
    const minute = Math.floor((diff % 3600) / 60);
    const second = Math.floor(diff % 60);

    if (year > 0) {
      return setLastSend(`${year} yr${year > 1 ? "s" : ""}`);
    }
    if (months > 0) {
      return setLastSend(`${months} mth${months > 1 ? "s" : ""}`);
    }

    if (day > 0) {
      return setLastSend(`${day} day${day > 1 ? "s" : ""}`);
    }
    if (hour > 0) {
      return setLastSend(`${hour} hr${hour > 1 ? "s" : ""}`);
    }
    if (minute > 0) {
      return setLastSend(`${minute} min${minute > 1 ? "s" : ""}`);
    }
    if (second > 15) {
      return setLastSend(`${second} sc${second > 1 ? "s" : ""}`);
    }
    if (second <= 15) {
      return setLastSend("Just now");
    }
  }

  useEffect(() => {
    getLastSeen(notification?.created);
  }, [notification]);

  return (
    <motion.div
      className={styles.container}
      style={isLast ? { marginBottom: "15px" } : {}}
      whileHover={{
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 9.5px 19px, rgba(0, 0, 0, 0.22) 0px 5px 4px",
      }}
      onHoverStart={InitialHover}
      onHoverEnd={FinalHover}
      onClick={() => {
        router.push(`/dashboard/profiles/${notification?.username}`);
        setNotiModals(false);
      }}
    >
      <motion.div className={styles.view_profile_bg}>
        <motion.div
          className={styles.view_profile_bg_icon}
          animate={backgroundAnimation}
        />
        <motion.div
          className={styles.view_profile_icon}
          animate={iconAnimation}
        >
          <ArrowForwardIcon style={{ width: "25px" }} />
        </motion.div>
      </motion.div>
      <div className={styles.avatar}>
        <div className={styles.noti_type_icon}>
          <PeopleFillIcon style={{ width: "25px" }} />
        </div>
        <AvatarUser
          email={notification.email}
          style={{ height: "60px", width: "60px" }}
          size={60}
        />
      </div>
      <div className={styles.context}>
        <span className={styles.username}>{notification.username}</span>
        <span> wants to be your friend</span>
        <div className={styles.time}>
          <span style={{ marginRight: "5px" }}>
            <TimeIcon style={{ width: "20px" }} />
          </span>
          {lastSend}
        </div>
      </div>
    </motion.div>
  );
}

export default FriendRequest;
