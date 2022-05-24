import { useLayout } from "../../store/layout";
import { useUser } from "../../store/user";
import AvatarUser from "../icons/avatar";
import styles from "./front-profile.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function FrontProfile({ device, width, height }) {
  const { user: loggedUser } = useUser();
  const { mobileNavState } = useLayout();

  const [user, setUser] = useState();

  const router = useRouter();

  const containerAnimation = useAnimation();
  const background1Animation = useAnimation();
  const background2Animation = useAnimation();
  const loginAnimation = useAnimation();
  const login1Animation = useAnimation();

  const { totalHeight, scroll, totalScroll } = useLayout();

  function showLogin() {
    if (scroll.y <= 300) {
      return true;
    }
    if (totalScroll - totalHeight == 0) {
      return true;
    }
    return false;
  }

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

      if (router.pathname !== "/log-in") {
        loginAnimation.start({
          top: "-100%",
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
      }

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

    if (router.pathname !== "/log-in") {
      loginAnimation.start({
        top: "0%",
        transition: {
          delay: 0.8,
          duration: 1,
        },
      });
    }

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
      <AnimatePresence exitBeforeEnter>
        {user ? (
          <motion.div
            className={styles.container}
            style={
              device === "mobile"
                ? { width: "50px", height: "50px" }
                : { width: "60px", height: "60px" }
            }
            animate={containerAnimation}
            key="user-profile"
            exit={{
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
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
          router.pathname !== "/log-in" &&
          showLogin() && (
            <motion.div
              className={styles.log_in_container}
              style={
                totalHeight - totalScroll == 0
                  ? { color: "#fff" }
                  : { color: "#050505" }
              }
              key="log-in"
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <div className={styles.log_in_holder}>Log in</div>
              <motion.div
                className={styles.log_in}
                animate={loginAnimation}
                key="login-button"
              >
                <Link href={"/log-in"}>Log in</Link>
              </motion.div>
              <motion.div
                className={styles.log_in1}
                animate={login1Animation}
                // exit={{
                //   top: "100%",
                //   transition: { duration: 0.5, delay: 1 },
                //   opacity: 0,
                //   display: "none",
                // }}
                key="login-button1"
              >
                <Link href={"/log-in"}>Log in</Link>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
}

export default FrontProfile;
