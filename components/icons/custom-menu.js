import styles from "./custom-menu.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import CustomMenuLink from "./custom-menu-link";
import { useLayout } from "../../store/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCountUp } from "react-countup";
import { useRef } from "react";
import Link from "next/link";

const links = [
  { name: "Plans", url: "/plans" },
  { name: "About us", url: "/about-us" },
  { name: "Support", url: "/support" },
  { name: "Contact", url: "/contact" },
];

function CustomMenuIcon({ style, device, height }) {
  const lineGap = device === "mobile" ? 8 : 10;
  const router = useRouter();

  const line1 = useAnimation();
  const line2 = useAnimation();
  const line3 = useAnimation();
  const bgHolderAnimation = useAnimation();
  const backgroundAnimation = useAnimation();
  const firstLoadBGAimation = useAnimation();
  const linkAnimation = useAnimation();
  const counterAnimation = useAnimation();
  const initialCounterAnimation = useAnimation();

  const counterLineAnimation = useAnimation();
  const counterLineAnimation2 = useAnimation();

  const {
    mobileNavState,
    setMobileNavState,
    scroll,
    setScrollLocked,
    totalHeight,
    setInitalLoading,
    initalLoading,
    pageLoading,
    scrollTo,
    totalScroll,
  } = useLayout();

  const [menuOpen, setMenuOpen] = useState(false);

  const countUpRef = useRef(null);
  const countUpRef2 = useRef(null);

  function showMenu() {
    if (scroll.y <= 300) {
      return true;
    }
    if (totalScroll - totalHeight == 0) {
      return true;
    }
    return false;
  }

  const { start: initalStart } = useCountUp({
    ref: countUpRef2,
    start: 0,
    end: 100,
    duration: 1,
    onStart: () => {
      initialCounterAnimation.start({
        opacity: 1,
        color: "#fff",
      });
      counterLineAnimation.start({
        height: "100%",
        transition: { duration: 1 },
      });
    },
    onEnd: () => {
      counterLineAnimation.start({
        height: "0%",
        bottom: "100%",
        transition: { duration: 1 },
      });
      setInitalLoading(false);
    },
  });

  const { reset, pauseResume } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: 100,
    duration: 1,
    onEnd: () => {
      setMobileNavState(false);
      counterAnimation.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    },
  });
  async function CloseBackGround() {
    firstLoadBGAimation.start({
      top: "-5000px",
      transition: { duration: 2, ease: "easeInOut" },
    });
  }
  async function CloseBackGround1() {
    await counterLineAnimation.start({
      height: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    counterLineAnimation.start({
      height: "0%",
      bottom: "100%",
      transition: { duration: 1, ease: "easeInOut" },
    });
    firstLoadBGAimation.start({
      top: "-5000px",
      transition: { duration: 2, ease: "easeInOut" },
    });
    counterLineAnimation2.start({
      backgroundColor: "#fff",
      transition: { duration: 0, delay: 1.5 },
    });
  }
  async function loading() {
    firstLoadBGAimation.start({
      top: "1000px",
      transition: { duration: 0 },
    });
    counterLineAnimation.start({
      bottom: 0,
      transition: { duration: 0 },
    });
    counterLineAnimation.start({
      height: "10%",
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    firstLoadBGAimation.start({
      top: "-1000px",
      transition: { duration: 1.5, ease: "easeInOut" },
    });
  }
  useEffect(() => {
    if (!pageLoading.url) {
      return CloseBackGround();
    }
    // if (router?.pathname === pageLoading.url) {
    //   setMobileNavState(false);
    //   return;
    // }

    // console.log(pageLoading);

    if (pageLoading.loading) {
      if (!mobileNavState) {
        counterLineAnimation2.start({
          backgroundColor: "#050505",
          transition: { duration: 0.5, ease: "easeInOut" },
        });
        return loading();
      }

      // if (!mobileNavState) {
      if (countUpRef) {
        reset();
        // pauseResume();
      }
      counterAnimation.start({
        opacity: 1,
      });
      counterLineAnimation.start({
        bottom: 0,
        transition: { duration: 0 },
      });
      counterLineAnimation.start({
        height: "10%",
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }

    if (!pageLoading.loading) {
      if (!mobileNavState) {
        setTimeout(() => {
          scrollTo({ y: 0 });
        }, 1000);

        return CloseBackGround1();
      }

      setScrollLocked(false);

      pauseResume();

      counterLineAnimation.start({
        height: "100%",
        transition: { duration: 1, ease: "easeInOut" },
      });
    }
  }, [pageLoading]);

  useEffect(() => {
    async function openMenu() {
      if (mobileNavState) {
        counterAnimation.start({
          opacity: 0,
          transition: { duration: 0 },
        });
        setMenuOpen(true);
        line1.start({
          y: -lineGap,
          rotate: 0,
          transition: { duration: 0 },
        });

        line3.start({
          y: lineGap,
          rotate: 0,
          transition: { duration: 0 },
        });
        await line2.start({ left: "0%", transition: { duration: 0 } });
        await linkAnimation.start({
          left: "-100%",
          transition: { duration: 0 },
        });

        bgHolderAnimation.start({
          display: "contents",
          transition: {
            duration: 0,
          },
        });
        await backgroundAnimation.start({
          top: "5000px",
          transition: { duration: 0 },
        });
        backgroundAnimation.start({
          top: "-1000px",
          transition: { duration: 2 },
        });
        counterLineAnimation2.start({
          backgroundColor: "#050505",
          transition: { duration: 0.5, ease: "easeInOut", delay: 1 },
        });
        line1.start({ backgroundColor: "#fff", transition: { duration: 2 } });
        line3.start({ backgroundColor: "#fff", transition: { duration: 2 } });

        await line2.start({ left: "100%", transition: { duration: 0.5 } });
        linkAnimation.start({
          left: "0%",
          transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
        });

        line1.start({ y: 0, rotate: 45, transition: { duration: 0.5 } });
        line3.start({ y: 0, rotate: 315, transition: { duration: 0.5 } });

        return;
      }

      if (!mobileNavState) {
        counterLineAnimation2.start({
          backgroundColor: "#fff",
          transition: { duration: 0.5, ease: "easeInOut", delay: 1 },
        });
        setMenuOpen(false);
        linkAnimation.start({
          left: "100%",
          transition: { duration: 1.5, ease: "easeInOut" },
        });
        line1.start({ y: -lineGap, rotate: 0, transition: { duration: 0.5 } });
        line3.start({ y: lineGap, rotate: 0, transition: { duration: 0.5 } });

        if (!initalLoading) {
          line1.start({
            backgroundColor:
              totalHeight - totalScroll == 0 ? "#fff" : "#050505",
            transition: { duration: 1.5 },
          });
          line3.start({
            backgroundColor:
              totalHeight - totalScroll == 0 ? "#fff" : "#050505",
            transition: { duration: 1.5 },
          });
          counterLineAnimation.start({
            height: 0,
            bottom: "100%",
            transition: { duration: 1, ease: "easeInOut" },
          });
        }

        counterAnimation.start({
          opacity: 0,
        });

        await backgroundAnimation.start({
          top: "-5000px",
          transition: { duration: 1.5 },
        });

        line2.start({ left: "0%", transition: { duration: 0.5 } });

        bgHolderAnimation.start({
          display: "none",
          transition: {
            duration: 0,
          },
        });
      }
    }

    openMenu();
  }, [mobileNavState]);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showMenu() && (
          <motion.div
            className={styles.text_nav_state}
            key={"text_nav_state"}
            style={
              totalHeight - totalScroll == 0
                ? { color: "#fff" }
                : { color: "#050505" }
            }
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => {
              setMobileNavState((prevState) => !prevState);
              setScrollLocked((prevState) => !prevState);
            }}
          >
            <div style={{ opacity: 0 }}>Close</div>
            <AnimatePresence exitBeforeEnter>
              {mobileNavState ? (
                <motion.div
                  className={styles.text_nav}
                  key={"text_nav_close"}
                  initial={{ top: "100%", color: "#fff" }}
                  animate={{
                    top: "0%",
                    color: "#fff",
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                  }}
                  exit={{
                    top: "100%",
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                >
                  Close
                </motion.div>
              ) : (
                <motion.div
                  className={styles.text_nav}
                  animate={{
                    top: "0%",
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                  }}
                  exit={{
                    top: "-100%",
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                  key={"text_nav_menu"}
                >
                  Menu
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {showMenu() && (
          <motion.div
            className={styles.container}
            style={style}
            onClick={() => {
              setMobileNavState((prevState) => !prevState);
              setScrollLocked((prevState) => !prevState);
            }}
            key={"mobilenavMenu"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className={styles.relative_container}>
              <motion.div
                className={styles.line}
                initial={{ y: -lineGap }}
                animate={line1}
                style={
                  totalHeight - totalScroll == 0
                    ? { backgroundColor: "#fff" }
                    : { backgroundColor: "#050505" }
                }
              />
              <motion.div
                className={styles.line}
                animate={line2}
                style={
                  totalHeight - totalScroll == 0
                    ? { backgroundColor: "#fff" }
                    : { backgroundColor: "#050505" }
                }
              />
              <motion.div
                className={styles.line}
                initial={{ y: lineGap }}
                animate={line3}
                style={
                  totalHeight - totalScroll == 0
                    ? { backgroundColor: "#fff" }
                    : { backgroundColor: "#050505" }
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className={styles.mobile_nav} animate={bgHolderAnimation}>
        <div className={styles.fixed_content} style={{ zIndex: "102" }}>
          <motion.div
            className={styles.mobile_nav_bg}
            //   initial={{ scale: 2 }}
            animate={backgroundAnimation}
          />
        </div>
      </motion.div>
      <motion.div className={styles.mobile_nav} animate={bgHolderAnimation}>
        <div className={styles.fixed_content}>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: "106",
            }}
          >
            <div className={styles.links_container}>
              <div className={styles.brand_container}>
                <div className={styles.link_holder}>Subsica</div>
                <motion.div
                  className={styles.brand_name}
                  animate={linkAnimation}
                >
                  <Link href={"/"}>Subsica</Link>
                </motion.div>
              </div>

              {links.map((link) => {
                return (
                  <CustomMenuLink
                    link={link}
                    device={device}
                    menuOpen={menuOpen}
                    key={link.name + link.link}
                    delay={Math.random() * 1.1 + 1}
                  />
                );
              })}
            </div>
          </div>
          <motion.div
            ref={countUpRef}
            className={styles.counter}
            animate={counterAnimation}
          />
        </div>
      </motion.div>
      <motion.div
        className={styles.first_load_bg}
        //   initial={{ scale: 2 }}
        animate={firstLoadBGAimation}
      />
      <motion.div className={styles.counter_line_container}>
        {/* <div>asdasdasda</div> */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <motion.div
            className={styles.counter_line}
            animate={counterLineAnimation}
          />
          {!initalLoading && (
            <motion.div
              className={styles.counter_line}
              animate={counterLineAnimation2}
              style={{
                top: `${(scroll.y / (totalHeight - height)) * 80}%`,
                height: "20%",
                zIndex: 1,
                // borderRadius: "2px",
              }}
            />
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {initalLoading && (
          <motion.div
            ref={countUpRef2}
            className={styles.counter1}
            initial={{ opacity: 0 }}
            animate={initialCounterAnimation}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            key="counter12345"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CustomMenuIcon;
