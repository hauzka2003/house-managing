import styles from "./user-profile.module.css";
import AvatarUser from "../icons/avatar";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import AddFriendIcon from "../icons/add-friend";
import CameraFillIcon from "../icons/camera.-fill";
import axios from "axios";

function UserAvatar({ user }) {
  const usernameAnimation = useAnimation();
  const avatarAnimation = useAnimation();
  const addFriendAnimation = useAnimation();
  const sendMessageAnimation = useAnimation();
  const cameraAnimation = useAnimation();
  const cameraAnimation1 = useAnimation();
  const cameraBGAnimation = useAnimation();
  const cameraTextAnimation = useAnimation();
  const addFriendAvatarAnimation = useAnimation();
  const addFriendShadowAnimation = useAnimation();
  const addFriendAvatarAnimation1 = useAnimation();
  const usernameHolderAnimation = useAnimation();
  const backgroundAnimation = useAnimation();
  const bgHolderAnimation = useAnimation();

  const [sentSuccess, setSentSuccess] = useState(false);
  const [firstSent, setFirstSent] = useState(false);
  const [loadingbg, setLoadingbg] = useState(0);

  useEffect(() => {
    if (user?.isRequested) {
      setFirstSent(true);
      return setSentSuccess(true);
    }
    setFirstSent(false);
    return setSentSuccess(false);
  }, [user]);

  function updateBGHoverStart() {
    cameraAnimation.start({
      top: "100%",
      transition: { duration: 1 },
    });
    cameraAnimation1.start({
      top: "20%",
      transition: { duration: 1 },
    });
    cameraBGAnimation.start({
      backgroundColor: "#333",
      transition: { duration: 0.5 },
    });
    cameraTextAnimation.start({ color: "#f4f4f5" });
  }

  function updateBGHoverEnd() {
    cameraAnimation.start({
      top: "20%",
      transition: { duration: 1 },
    });
    cameraAnimation1.start({
      top: "-100%",
      transition: { duration: 1 },
    });
    cameraBGAnimation.start({
      backgroundColor: "#f4f4f5",
      transition: { duration: 0.5 },
    });
    cameraTextAnimation.start({ color: "#333" });
  }

  function updateAddFriendHoverStart() {
    if (user?.isRequested) {
      return;
    }

    addFriendAvatarAnimation.start({
      top: "100%",
      transition: { duration: 1 },
    });
    addFriendAvatarAnimation1.start({
      top: "25%",
      transition: { duration: 1 },
    });
    addFriendAnimation.start({
      backgroundColor: "#333",
      transition: { duration: 0.5 },
    });
    addFriendAnimation.start({
      color: "#f4f4f5",
      transition: { duration: 0.5 },
    });
  }

  function updateAddFriendHoverEnd() {
    if (user?.isRequested) {
      return;
    }
    addFriendAvatarAnimation.start({
      top: "25%",
      transition: { duration: 1 },
    });
    addFriendAvatarAnimation1.start({
      top: "-100%",
      transition: { duration: 1 },
    });
    addFriendAnimation.start({
      backgroundColor: "#f4f4f5",
      transition: { duration: 0.5 },
    });
    addFriendAnimation.start({
      color: "#333",
      transition: { duration: 0.5 },
    });
  }

  async function finishLoading() {
    await backgroundAnimation.start({
      top: "20%",
      transition: { duration: 0.5, type: "tween" },
    });

    bgHolderAnimation.start({
      overflow: "hidden",
    });

    return backgroundAnimation.start({
      scale: 20,
      transition: { duration: 2, type: "tween" },
    });
  }

  async function InitialAnimation() {
    await avatarAnimation.start({
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 1 },
    });
    usernameHolderAnimation.start({
      y: 0,
      transition: { duration: 2, ease: "easeOut" },
    });
    await usernameAnimation.start({
      bottom: "-10%",
      transition: { duration: 0.5, ease: "easeOut" },
    });
    usernameAnimation.start({
      bottom: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
    await cameraBGAnimation.start({
      bottom: "-10%",
      transition: { duration: 0.5, ease: "easeOut" },
    });
    cameraBGAnimation.start({
      bottom: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    addFriendAnimation.start({
      top: "-10%",
      transition: { duration: 0.5, ease: "easeOut" },
    });
    addFriendShadowAnimation.start({
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      transition: { duration: 0.5, ease: "easeOut" },
    });
    await sendMessageAnimation.start({
      bottom: "-10%",
      transition: { duration: 0.5, ease: "easeOut" },
    });

    sendMessageAnimation.start({
      bottom: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    addFriendAnimation.start({
      top: "50%",
      transform: "translateY(-50%)",
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }

  useEffect(() => {
    async function load() {
      finishLoading();
      return InitialAnimation();
    }

    if (user) {
      return load();
    }

    async function backgroundSequence() {
      await backgroundAnimation.start({
        top: "45vh",
        transition: { duration: 0.5, type: "tween" },
      });
      await backgroundAnimation.start({
        top: "20%",
        transition: { duration: 0.5, type: "tween" },
      });
      await backgroundAnimation.start({
        top: "45vh",
        transition: { duration: 0.5, delay: 0.1, type: "tween" },
      });
      await backgroundAnimation.start({
        top: "20%",
        transition: { duration: 0.5, type: "tween" },
      });
      setLoadingbg(loadingbg + 1);
    }

    backgroundSequence();
  }, [loadingbg, user]);

  useEffect(() => {
    setLoadingbg(true);
    if (user?.isRequested) {
      setSentSuccess(true);
    }
  }, []);

  async function addFriend() {
    if (user?.isRequested) {
      return;
    }

    if (firstSent) {
      return;
    }

    setSentSuccess(true);

    const res = await axios
      .post("/api/request/friend-request", {
        userID: user?.id,
      })
      .catch((err) => {
        console.log(err);
        setSentSuccess(false);
      });
    console.log(res);

    if (res?.status === 200) {
      setSentSuccess(true);
      setFirstSent(true);
    }
  }

  return (
    <motion.div className={styles.user_avatar_container}>
      <motion.div
        className={styles.user_avatar_background_holder}
        animate={bgHolderAnimation}
      >
        <motion.div
          className={styles.user_avatar_background}
          initial={{ width: "100px", height: "100px" }}
          animate={backgroundAnimation}
        />
      </motion.div>

      <motion.div
        className={styles.user_avatar_update_background}
        onHoverStart={updateBGHoverStart}
        onHoverEnd={updateBGHoverEnd}
      >
        <div className={styles.user_avatar_update_background1}>
          <CameraFillIcon style={{ width: "25px" }} />
          <div style={{ marginLeft: "10px" }}>Update background</div>
        </div>
        <motion.div
          className={styles.user_avatar_update_background2}
          initial={{ bottom: "-100%" }}
          animate={cameraBGAnimation}
        >
          <motion.div
            style={{
              width: "25px",
              position: "absolute",
              left: "10px",
            }}
            initial={{ left: "10px", top: "20%" }}
            animate={cameraAnimation}
          >
            <CameraFillIcon />
          </motion.div>
          <motion.div
            style={{
              width: "25px",
              position: "absolute",
              left: "10px",
              top: "-100%",
              fill: "white",
            }}
            initial={{ left: "10px", top: "-100%" }}
            animate={cameraAnimation1}
          >
            <CameraFillIcon />
          </motion.div>

          <motion.div
            style={{ marginLeft: "10px" }}
            animate={cameraTextAnimation}
          >
            Update background
          </motion.div>
        </motion.div>
      </motion.div>

      <div className={styles.user_avatar_buttons}>
        <motion.div
          className={styles.user_avatar_add_friend}
          initial={{
            boxShadow: "none",
          }}
          animate={addFriendShadowAnimation}
          onHoverStart={updateAddFriendHoverStart}
          onHoverEnd={updateAddFriendHoverEnd}
        >
          <div className={styles.user_avatar_add_friend2}>
            <AddFriendIcon style={{ width: "20px" }} />
            <div style={{ marginLeft: "10px" }}>Add Friend</div>
          </div>
          <motion.div
            className={styles.user_avatar_add_friend1}
            initial={{
              top: "-100%",
              textAlign: "center",
            }}
            animate={addFriendAnimation}
            onClick={addFriend}
            style={
              sentSuccess
                ? { cursor: "not-allowed", opacity: 0.5 }
                : { cursor: "pointer", opacity: 1 }
            }
          >
            <motion.div
              className={styles.user_avatar_add_friend1_icon}
              style={{ width: "20px", left: "10px", top: "25%" }}
              initial={{ left: "10px", top: "25%" }}
              animate={addFriendAvatarAnimation}
            >
              <AddFriendIcon />
            </motion.div>
            <motion.div
              className={styles.user_avatar_add_friend1_icon}
              style={{ width: "20px", left: "10px", top: "-100%" }}
              initial={{
                left: "10px",
                top: "-100%",
                color: "#f4f4f5",
                fill: "white",
              }}
              animate={addFriendAvatarAnimation1}
            >
              <AddFriendIcon />
            </motion.div>
            <div style={{ marginLeft: "25px" }}>
              {sentSuccess ? "Sent" : "Add Friend"}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className={styles.user_avatar_holder}>
        <AvatarUser
          style={{
            width: "160px",
            height: "160px",
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px,rgba(0, 0, 0, 0.22) 0px 15px 12px",
            borderRadius: "50%",
          }}
          initial={{ scale: 1.2, opacity: 0, y: 30 }}
          animate={avatarAnimation}
          size={160}
          email={user?.email}
        />
        <div className={styles.user_avatar_infor}>
          <motion.div
            className={styles.user_avatar_username}
            animate={usernameHolderAnimation}
            initial={{ y: 20 }}
          >
            <div style={{ opacity: 0 }}>{user?.username}</div>
            <motion.div
              initial={{ position: "absolute", bottom: "-100%" }}
              animate={usernameAnimation}
            >
              {user?.username}
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.user_avatar_email}
            animate={usernameHolderAnimation}
            initial={{ y: 20 }}
          >
            <div style={{ opacity: 0 }}>{user?.email}</div>
            <motion.div
              initial={{ position: "absolute", bottom: "-100%" }}
              animate={usernameAnimation}
            >
              {user?.email}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UserAvatar;
