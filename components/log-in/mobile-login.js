import styles from "./mobile-login.module.css";
import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import { useLayout } from "../../store/layout";
import ChervonDownIcon from "../icons/chevron-down";
import SignInput from "./sign-input";
import PersonFillIcon from "../icons/person-fill";
import LockClosedFill from "../icons/lock-closed-fill";

function MobileLogIn({ device, height }) {
  const [toggleSign, setToggleSign] = useState(false);
  const [signinView, setSigninView] = useState(false);

  const { scroll } = useLayout();

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
    // shouldAlwaysCompleteAnimation: true,
  });
  const squareDeco = useParallax({
    speed: -10,
    shouldAlwaysCompleteAnimation: true,
  });
  const index = useParallax({
    speed: -15,
    translateY: [0, 200, "easeInCubic"],
    shouldAlwaysCompleteAnimation: true,
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
  }, [signinView]);

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
      <AnimateSharedLayout>
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

          {!signinView && (
            <motion.div
              className={styles.left_button_container}
              layoutId="sign_button"
              transition={{ duration: 1 }}
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
            style={
              scroll.y >= 0
                ? {
                    left: `-${(scroll.y / height) * 150}%`,
                    top: `${(scroll.y / height) * 50}%`,
                  }
                : {}
            }
          >
            <motion.div
              className={styles.slogan_text}
              animate={sloganAnimation}
            >
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
        />
      </AnimateSharedLayout>
    </>
  );
}

export default MobileLogIn;
