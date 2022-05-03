import styles from "./mobile-login.module.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

function MobileLogIn({ device }) {
  const [toggleSign, setToggleSign] = useState(false);

  const leftButtonAnimation = useAnimation();
  const leftButton1Animation = useAnimation();
  const headerTextAnimation = useAnimation();
  const headerText1Animation = useAnimation();

  useEffect(() => {
    leftButtonAnimation.start({
      top: "0%",
      transition: {
        duration: 0.5,
        delay: 1,
      },
    });
    headerTextAnimation.start({
      top: "0%",
      transition: {
        duration: 0.5,
        delay: 1,
      },
    });
  }, []);

  useEffect(() => {
    if (toggleSign) {
      leftButtonAnimation.start({
        top: "-100%",
        transition: {
          duration: 0.5,
        },
      });

      headerTextAnimation.start({
        top: "100%",
        transition: {
          duration: 0.5,
        },
      });

      headerText1Animation.start({
        top: "0%",
        transition: {
          duration: 0.5,
          delay: 0.5,
        },
      });

      leftButton1Animation.start({
        top: "0%",
        transition: {
          duration: 0.5,
          delay: 0.5,
        },
      });
    }

    if (!toggleSign) {
      leftButtonAnimation.start({
        top: "0%",
        transition: {
          duration: 0.5,
          delay: 0.5,
        },
      });
      headerText1Animation.start({
        top: "-100%",
        transition: {
          duration: 0.5,
        },
      });

      headerTextAnimation.start({
        top: "0%",
        transition: {
          duration: 0.5,
          delay: 0.5,
        },
      });
      leftButton1Animation.start({
        top: "100%",
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [toggleSign]);

  return (
    <>
      <motion.div className={styles.header_container}>
        <div className={styles.left_button_container}>
          <div style={{ opacity: 0 }}>Sign Up</div>
          <motion.div
            className={styles.left_button}
            animate={leftButtonAnimation}
            onClick={() => setToggleSign(!toggleSign)}
          >
            Sign Up
          </motion.div>
          <motion.div
            className={styles.left_button1}
            animate={leftButton1Animation}
            onClick={() => setToggleSign(!toggleSign)}
          >
            Sign In
          </motion.div>
        </div>
        <div
          className={styles.header_text_container}
          style={
            device === "mobile"
              ? { fontSize: "2.8rem", letterSpacing: "5px" }
              : { fontSize: "5rem", letterSpacing: "8px" }
          }
        >
          <div style={{ display: "flex" }}>
            Sign{" "}
            <div
              style={{
                overflow: "hidden",
                position: "relative",
                marginLeft: "1rem",
                display: "inline-block",
                height: "100%",
              }}
            >
              <span style={{ opacity: 0 }}>Up</span>
              <motion.span
                className={styles.header_text}
                animate={headerTextAnimation}
              >
                In
              </motion.span>
              <motion.span
                className={styles.header_text1}
                animate={headerText1Animation}
              >
                Up
              </motion.span>
            </div>
          </div>
          <div
            className={styles.index}
            style={
              device === "mobile"
                ? { fontSize: "1.5rem" }
                : { fontSize: "1.8rem" }
            }
          >
            05
          </div>
        </div>
        <motion.div initial={{ y: 40 }} className={styles.slogan}>
          Continue our works and business that we left off
        </motion.div>
      </motion.div>
    </>
  );
}

export default MobileLogIn;
