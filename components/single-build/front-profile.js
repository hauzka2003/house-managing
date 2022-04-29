import { useLayout } from "../../store/layout";
import { useUser } from "../../store/user";
import AvatarUser from "../icons/avatar";
import styles from "./front-profile.module.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

function FrontProfile({ device, width, height }) {
  //   if (width <= 500) {
  //     dimenstion = { ...dimenstion };
  //   }

  const { user: loggedUser } = useUser();
  const { mobileNavState, setMobileNavState } = useLayout();

  const [user, setUser] = useState();

  const containerAnimation = useAnimation();
  const background1Animation = useAnimation();
  const background2Animation = useAnimation();
  const loginAnimation = useAnimation();
  const login1Animation = useAnimation();

  useEffect(() => {
    setUser(loggedUser);
  }, [loggedUser]);

  useEffect(() => {
    if (mobileNavState) {
      containerAnimation.start({
        zIndex: "104",
      });
      background1Animation.start({
        backgroundColor: "#fff",
        transition: {
          delay: 1,
        },
      });

      loginAnimation.start({
        top: "-100%",
        transition: {
          duration: 1,
        },
      });
      login1Animation.start({
        top: "0%",
        transition: {
          delay: 1,
          duration: 1,
        },
      });
      background2Animation.start({
        backgroundColor: "#fff",
        transition: {
          delay: 1,
        },
      });
      background1Animation.start({
        left: "-50%",
        transition: {
          delay: 1,
          duration: 0.5,
        },
      });
      return background2Animation.start({
        left: "50%",
        transition: {
          delay: 1,
          duration: 0.5,
        },
      });
    }

    if (!mobileNavState) {
      containerAnimation.start({
        zIndex: "10",
        transition: {
          delay: 1.5,
        },
      });
    }
    login1Animation.start({
      top: "100%",
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    });
    loginAnimation.start({
      top: "0%",
      transition: {
        delay: 0.8,
        duration: 1,
      },
    });
    background1Animation.start({
      backgroundColor: "#050505",
      transition: {
        delay: 1,
      },
    });

    background2Animation.start({
      backgroundColor: "#050505",
      transition: {
        delay: 1,
      },
    });
    background1Animation.start({
      left: "50%",
      transition: {
        delay: 1,
        duration: 0.5,
      },
    });
    return background2Animation.start({
      left: "-50%",
      transition: {
        delay: 1,
        duration: 0.5,
      },
    });
  }, [mobileNavState]);

  return (
    <>
      {user ? (
        <motion.div
          className={styles.container}
          style={
            device === "mobile"
              ? { width: "50px", height: "50px" }
              : { width: "60px", height: "60px" }
          }
          animate={containerAnimation}
        >
          <Link href={"/dashboard"}>
            <div className={styles.relative_container}>
              <AvatarUser
                email={user?.email}
                radius={10}
                size={device === "mobile" ? 50 : 60}
                style={
                  device === "mobile"
                    ? { width: "50px", height: "50px" }
                    : { width: "60px", height: "60px" }
                }
              />

              <motion.div
                className={styles.avatar_bg}
                animate={background1Animation}
              />
              <motion.div
                className={styles.avatar_bg1}
                animate={background2Animation}
              />
            </div>
          </Link>
        </motion.div>
      ) : (
        <div className={styles.log_in_container}>
          <div className={styles.log_in_holder}>Log in</div>
          <motion.div className={styles.log_in} animate={loginAnimation}>
            <Link href={"/log-in"}>Log in</Link>
          </motion.div>
          <motion.div className={styles.log_in1} animate={login1Animation}>
            <Link href={"/log-in"}>Log in</Link>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default FrontProfile;
