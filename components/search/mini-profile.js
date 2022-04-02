import styles from "./search-modal.module.css";
import Avvvatars from "avvvatars-react";
import { animate, motion, useAnimation } from "framer-motion";
import CircleChat from "../icons/circle-chat";
import { useUser } from "../../store/user";
import { useRouter } from "next/router";

function MiniProfile({ username, email, setSearchModal }) {
  const avatarAnimation = useAnimation();
  const { user } = useUser();
  const router = useRouter();

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
    >
      <motion.div className={styles.avatar} animate={avatarAnimation}>
        <Avvvatars value={email} size={40} shadow={true} />
      </motion.div>

      <div className={styles.user_detail}>
        <div className={styles.user_detail_username}>
          {username}
          {user?.email === email && " (You)"}
        </div>
        <div className={styles.user_detail_email}>{email}</div>
      </div>
      <div>
        {user?.email !== email && <CircleChat style={{ width: "30px" }} />}
      </div>
    </motion.div>
  );
}

export default MiniProfile;
