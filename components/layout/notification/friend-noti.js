import { motion, useAnimation } from "framer-motion";
import AvatarUser from "../../icons/avatar";
import CheckMarkIcon from "../../icons/check-mark";
import CloseIcon from "../../icons/close";
import AddPersonFillIcon from "../../icons/person-add-fill";
import TimeIcon from "../../icons/time";
import styles from "./friend-noti.module.css";
import { useRouter } from "next/router";
import { useNotification } from "../../hooks/use-notification";
import CloseCircleIcon from "../../icons/close_circle";
import { useEffect } from "react";
function FriendNotification({ notification, removeNotification }) {
  const acceptButtonAnimation = useAnimation();
  const declineButtonAnimation = useAnimation();
  const notiIconAnimation = useAnimation();
  const acceptBGButton = useAnimation();
  const declineBGButton = useAnimation();
  const CloseIconAnimation = useAnimation();
  const CheckMrkAnimation = useAnimation();
  const timeOutAnimation = useAnimation();
  const router = useRouter();

  const { acceptFriendRequest, declineFriendRequest } = useNotification();

  const draw = {
    hidden: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
    stop: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.001 },
        },
      };
    },
  };

  useEffect(() => {
    timeOutAnimation.start({
      height: "0px",
      transition: {
        duration: 8,
        ease: "easeInOut",
      },
    });

    setTimeout(() => {
      removeNotification(notification.id);
    }, 8000);
  }, []);

  function acceptFriend() {
    acceptFriendRequest(notification);
  }

  function declineFriend() {
    declineFriendRequest(notification);
  }

  async function hoverAcceptStart() {
    acceptButtonAnimation.start({
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      transition: { duration: 1 },
    });
    notiIconAnimation.start({
      background:
        "linear-gradient(-30deg, rgba(175,255,173,1) 0%, rgba(219,255,202,1) 100%)",
    });
    acceptBGButton.start({
      background: "#fff",
      transition: { duration: 1 },
    });
    await CheckMrkAnimation.start("hidden");
    CheckMrkAnimation.start("visible");
  }

  function hoverAcceptEnd() {
    acceptButtonAnimation.start({
      width: "0px",
      height: "0px",
      borderRadius: "50%",
      transition: { duration: 1 },
    });
    notiIconAnimation.start({
      background:
        "linear-gradient(-30deg,rgba(163, 240, 239, 1) 0%,rgba(212, 245, 196, 1) 100%)",
      transition: { duration: 1 },
    });
    acceptBGButton.start({
      background: "transparent",
      transition: { duration: 1 },
    });
  }

  async function hoverDeclineStart() {
    declineButtonAnimation.start({
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      transition: { duration: 1 },
    });
    notiIconAnimation.start({
      background:
        "linear-gradient(-30deg, rgba(255,173,173,1) 0%, rgba(212,245,196,1) 100%)",
      transition: { duration: 1 },
    });
    declineBGButton.start({
      background: "#fff",
      transition: { duration: 1 },
    });
    await CloseIconAnimation.start("hidden");
    CloseIconAnimation.start("visible");
  }

  function hoverDeclineEnd() {
    declineButtonAnimation.start({
      width: "0px",
      height: "0px",
      borderRadius: "50%",
      transition: { duration: 1 },
    });
    notiIconAnimation.start({
      background:
        "linear-gradient(-30deg,rgba(163, 240, 239, 1) 0%,rgba(212, 245, 196, 1) 100%)",
      transition: { duration: 1 },
    });
    declineBGButton.start({
      background: "transparent",
      transition: { duration: 1 },
    });
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      positiontransition
      whileHover={{ scale: 1.03 }}
    >
      <div
        className={styles.close_button}
        onClick={() => {
          removeNotification(notification?.id);
        }}
      >
        <CloseCircleIcon style={{ width: "25px" }} />
      </div>
      <div
        className={styles.avatar_container}
        onClick={() => {
          router.push(`/dashboard/profiles/${notification.username}`);
        }}
      >
        <AvatarUser
          email={notification?.email}
          radius={6}
          size={40}
          style={{
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            borderRadius: "6px",
          }}
        />
      </div>
      <motion.div className={styles.container_icon} animate={notiIconAnimation}>
        <AddPersonFillIcon style={{ width: "20px", fill: "#333" }} />
        <motion.div
          className={styles.container_timeout}
          animate={timeOutAnimation}
        />
      </motion.div>
      <div className={styles.container_content}>
        <div className={styles.container_time}>
          <div style={{ width: "15px", height: "15px" }}>
            <TimeIcon style={{ width: "15px", height: "15px", fill: "#333" }} />
          </div>
          <div className={styles.time}>Just Now</div>
        </div>
        <div className={styles.container_message}>
          <span
            className={styles.message_username}
          >{`${notification?.username} `}</span>
          wanted to be your friend
        </div>
        <div className={styles.buttons}>
          <motion.div
            className={styles.button}
            onHoverStart={hoverAcceptStart}
            onHoverEnd={hoverAcceptEnd}
            animate={acceptBGButton}
            onClick={acceptFriend}
          >
            <CheckMarkIcon
              style={{ width: "20px" }}
              animate={CheckMrkAnimation}
              draw={draw}
            />
          </motion.div>

          <motion.div
            className={styles.button}
            onHoverStart={hoverDeclineStart}
            onHoverEnd={hoverDeclineEnd}
            animate={declineBGButton}
            onClick={declineFriend}
          >
            <CloseIcon
              style={{ width: "20px" }}
              animate={CloseIconAnimation}
              draw={draw}
            />
          </motion.div>
        </div>
        <div className={styles.buttons} style={{ zIndex: 0 }}>
          <div className={styles.button}>
            <motion.div
              className={styles.background}
              animate={acceptButtonAnimation}
            />
          </div>

          <div className={styles.button}>
            <motion.div
              className={styles.background_decline}
              animate={declineButtonAnimation}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FriendNotification;
