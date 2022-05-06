import styles from "./mobile-login.module.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useParallax } from "react-scroll-parallax";
import { useLayout } from "../../store/layout";
import ChervonDownIcon from "../icons/chevron-down";

function MobileLogIn({ device, height }) {
  const [toggleSign, setToggleSign] = useState(false);

  const { scroll, scrollTo } = useLayout();

  const leftButtonAnimation = useAnimation();
  const leftButton1Animation = useAnimation();
  const headerTextAnimation = useAnimation();
  const headerText1Animation = useAnimation();
  const sloganAnimation = useAnimation();
  const slogan1Animation = useAnimation();

  const header = useParallax({
    speed: -10,
    scale: [0.2, 2],
    startScroll: 0,
  });

  const slogan = useParallax({
    speed: -15,
    translateY: [0, 0],
  });
  const squareDeco = useParallax({
    speed: -20,
  });
  // const index = useParallax({
  //   speed: -200,
  // });

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
      sloganAnimation.start({
        top: "-150%",
        transition: {
          duration: 0.5,
        },
      });
      slogan1Animation.start({
        top: "50%",
        transition: {
          duration: 0.5,
          delay: 0.5,
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
      sloganAnimation.start({
        top: "50%",
        transition: {
          duration: 0.5,
          delay: 0.5,
        },
      });
      slogan1Animation.start({
        top: "150%",
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [toggleSign]);

  return (
    <>
      <motion.div className={styles.header_container}>
        <div className={styles.background_header}>
          <div
            className={styles.scroll_bottom_container}
            style={
              device === "mobile"
                ? {
                    right: "-35px",
                    bottom: "-35px",
                    width: "70px",
                    height: "70px",
                  }
                : {
                    right: "-60px",
                    bottom: "-60px",
                    width: "120px",
                    height: "120px",
                  }
            }
            onClick={() => {
              scrollTo({ y: height - 1 });
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                borderRadius: "50%",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#fff",
                  position: "absolute",
                  cursor: "pointer",
                }}
                onClick={() => {
                  scrollTo({ y: height - 1 });
                }}
              >
                <ChervonDownIcon
                  style={{
                    color: "#fff",
                  }}
                />
              </div>

              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  zIndex: 1,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
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
          <div
            className={styles.square_decoration}
            ref={squareDeco.ref}
            style={device === "mobile" ? {} : { top: "-100%", left: "-33%" }}
          />
          <div style={{ display: "flex" }} ref={header.ref}>
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
            // ref={index.ref}
          >
            05
          </div>
        </div>
        <motion.div
          initial={{ y: 50 }}
          className={styles.slogan}
          ref={slogan.ref}
          style={{
            left: `-${(scroll.y / height) * 150}%`,
          }}
        >
          <motion.div className={styles.slogan_text} animate={sloganAnimation}>
            Continue our works and business that we left behind
          </motion.div>
          <motion.div
            className={styles.slogan_text}
            animate={slogan1Animation}
            initial={{ top: "150%" }}
          >
            Join and use our tools to develop your business
          </motion.div>
        </motion.div>
      </motion.div>
      <div className={styles.sign_container}></div>
    </>
  );
}

export default MobileLogIn;
