import styles from "./search-modal.module.css";
import Avvvatars from "avvvatars-react";
import { motion, useAnimation } from "framer-motion";
import CircleChat from "../icons/circle-chat";
import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";

function MiniProfile({ username, email, setSearchModal, lastSeen, date }) {
  const avatarAnimation = useAnimation();
  const { user } = useUser();
  const router = useRouter();
  const [lastSeenAgo, setLastSeenAgo] = useState();

  console.log("lastSeenAgo", lastSeenAgo);
  console.log("lastSeen", lastSeen);

  function getLastSeen(lastSeen) {
    if (!lastSeen) return setLastSeenAgo("never");

    const lastSeenDate = new Date(lastSeen);

    const diff = Math.floor((date - lastSeenDate) / 1000);
    const year = Math.floor(diff / 31536000);
    const months = Math.floor(diff / (60 * 60 * 24 * 30));
    const day = Math.floor(diff / 86400);
    const hour = Math.floor((diff % 86400) / 3600);
    const minute = Math.floor((diff % 3600) / 60);
    const second = Math.floor(diff % 60);

    if (year > 0) {
      return setLastSeenAgo(`${year} yr${year > 1 ? "s" : ""}`);
    }
    if (months > 0) {
      return setLastSeenAgo(`${months} mth${months > 1 ? "s" : ""}`);
    }

    if (day > 0) {
      return setLastSeenAgo(`${day} day${day > 1 ? "s" : ""}`);
    }
    if (hour > 0) {
      return setLastSeenAgo(`${hour} hr${hour > 1 ? "s" : ""}`);
    }
    if (minute > 0) {
      return setLastSeenAgo(`${minute} min${minute > 1 ? "s" : ""}`);
    }
    if (second > 15) {
      return setLastSeenAgo(`${second} sc${second > 1 ? "s" : ""}`);
    }
    if (second <= 15) {
      console.log("lastSeenAgo in second", lastSeenAgo);
      return setLastSeenAgo("online");
    }
  }

  useEffect(() => {
    if (!lastSeen) {
      setLastSeenAgo("never");
    }

    getLastSeen(lastSeen);
    // const lastSeenRealTime = supabase
    //   .from(`profile:email=eq.${email}`)
    //   .on("UPDATE", (payload) => {
    //     if (payload?.new?.lastSeen) {
    //       console.log("payload", payload?.new?.lastSeen);
    //       return setLastSeenAgo(getLastSeen(payload?.new?.lastSeen));
    //     }
    //   })
    //   .subscribe();
    // return () => {
    //   supabase.removeSubscription(lastSeenRealTime);
    // };
  }, []);

  async function hoverStart() {
    await avatarAnimation.start({
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    });
  }

  async function hoverEnd() {
    avatarAnimation.start({ y: 0, transition: { duration: 0.5 } });
  }

  function onClick() {
    setSearchModal(false);
    if (user?.email === email) {
      return router.push("/dashboard/setting");
    }
  }

  return (
    <motion.div
      className={styles.mini_profile}
      initial={{ boxShadow: "none", opacity: 0 }}
      whileHover={{
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      }}
      animate={{ opacity: 1 }}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      exit={{ opacity: 0 }}
    >
      <motion.div className={styles.avatar} animate={avatarAnimation}>
        <div className={styles.status}>
          <div
            className={styles.status_circle}
            style={
              lastSeenAgo === "online"
                ? { backgroundColor: "#06D6A0" }
                : { backgroundColor: "#7f7979" }
            }
          />
          <div
            className={styles.status_text}
            style={
              lastSeenAgo === "online"
                ? { color: "#06D6A0" }
                : { color: "#7f7979" }
            }
          >
            {lastSeenAgo}
          </div>
        </div>
        <Avvvatars value={email} size={40} shadow={true} />
      </motion.div>

      <motion.div className={styles.user_detail}>
        <div className={styles.user_detail_username}>
          {username}
          {user?.email === email && " (You)"}
        </div>
        <div className={styles.user_detail_email}>{email}</div>
      </motion.div>
      <div>
        {user?.email !== email && <CircleChat style={{ width: "30px" }} />}
      </div>
    </motion.div>
  );
}

export default MiniProfile;
