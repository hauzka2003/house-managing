import styles from "./mobile-login.module.css";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import { useLayout } from "../../store/layout";
import ChervonDownIcon from "../icons/chevron-down";
import SignInput from "./sign-input";
import Image from "next/image";

function MobileLogIn({ device, height }) {
  const [toggleSign, setToggleSign] = useState(false);
  const [signinView, setSigninView] = useState(false);

  const { scroll, mobileNavState, totalHeight, currentDevice } = useLayout();
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [0, currentDevice.height], [0, 400]);

  const leftButtonAnimation = useAnimation();
  const leftButton1Animation = useAnimation();
  const headerTextAnimation = useAnimation();
  const headerText1Animation = useAnimation();
  const sloganAnimation = useAnimation();
  const slogan1Animation = useAnimation();

  const formRef = useRef(null);

  const header = useParallax({
    speed: -10,
    scale: [1, 2, "easeInCubic"],

    // shouldAlwaysCompleteAnimation: true,
  });

  const slogan = useParallax({
    speed: -15,
    scale: [1, 0, "easeInCubic"],
    opacity: [1, 0, "easeInCubic"],
    // shouldAlwaysCompleteAnimation: true,
  });
  const squareDeco = useParallax({
    speed: -10,
    shouldAlwaysCompleteAnimation: true,
  });
  const index = useParallax({
    speed: -15,
    translateY: [0, 200, "easeInCubic"],
    // shouldAlwaysCompleteAnimation: true,
  });

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
    transitionSignButton();
  }, [scroll]);

  function transitionSignButton() {
    if (toggleSign) {
      leftButtonAnimation.start({
        top: "-100%",
        transition: {
          duration: 0,
        },
      });

      leftButton1Animation.start({
        top: "0%",
        transition: {
          duration: 0,
          delay: 0,
        },
      });
    }

    if (!toggleSign) {
      leftButtonAnimation.start({
        top: "0%",
        transition: {
          duration: 0,
          delay: 0,
        },
      });

      leftButton1Animation.start({
        top: "100%",
        transition: {
          duration: 0,
        },
      });
    }
  }

  function animateSignButton() {
    if (toggleSign) {
      leftButtonAnimation.start({
        top: "-100%",
        transition: {
          duration: 0.5,
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

      leftButton1Animation.start({
        top: "100%",
        transition: {
          duration: 0.5,
        },
      });
    }
  }

  useEffect(() => {
    animateSignButton();
    if (toggleSign) {
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
    }

    if (!toggleSign) {
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

  function executeScroll() {
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {scroll.y <= 300 && (
          <motion.div
            className={styles.left_button_container}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.5 } }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className={styles.header_container}>
        <motion.div
          className={styles.black_water_center}
          style={{ y }}
          animate={
            mobileNavState
              ? {
                  zIndex: "103",
                  transition: {
                    delay: 1.4,
                    duration: 0,
                  },
                }
              : { zIndex: "0", transition: { delay: 1.3, duration: 0 } }
          }
        >
          <Image src={"/black-water/05.png"} width={500} height={500} />
        </motion.div>
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
              executeScroll();
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
                  executeScroll();
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
            style={
              device === "mobile"
                ? { zIndex: scroll.y > 0 ? 1 : -1 }
                : {
                    top: "80%",
                    left: "-34%",
                    height: "100px",
                    width: "70px",
                    zIndex: scroll.y > 0 ? 1 : -1,
                  }
            }
          >
            <div
              className={styles.index}
              style={
                device === "mobile"
                  ? { fontSize: "1.5rem" }
                  : { fontSize: "1.8rem" }
              }
              ref={index.ref}
            >
              05
            </div>
          </div>
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
        </div>
        <motion.div
          initial={{ y: 50 }}
          className={styles.slogan}
          ref={slogan.ref}
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
      <SignInput
        scroll={scroll}
        forwardedRef={formRef}
        setSigninView={setSigninView}
        signinView={signinView}
        animateSignButton={animateSignButton}
        toggleSign={toggleSign}
        setToggleSign={setToggleSign}
        scrollY={scrollY}
        currentDevice={currentDevice}
      />
    </>
  );
}

export default MobileLogIn;
