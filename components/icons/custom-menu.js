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

  const { mobileNavState, setMobileNavState, scroll } = useLayout();

  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const countUpRef = useRef(null);
  const countUpRef2 = useRef(null);

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
      setIsLoading(false);
    },
  });

  const { reset, pauseResume } = useCountUp({
    ref: countUpRef || "asd",
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

  useEffect(() => {
    async function CloseBackGround() {
      firstLoadBGAimation.start({
        top: "-5000px",
        transition: { duration: 2, ease: "easeInOut" },
      });
      initalStart();
    }

    CloseBackGround();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      if (router?.pathname === url) {
        return;
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
      // }
    });
    router.events.on("routeChangeComplete", (url) => {
      if (router?.pathname === url) {
        setMobileNavState(false);
        return;
      }

      pauseResume();

      counterLineAnimation.start({
        height: "100%",
        transition: { duration: 1, ease: "easeInOut" },
      });
    });

    return () => {
      router.events.off("routeChangeStart");
      router.events.off("routeChangeComplete");
    };
  }, []);

  useEffect(() => {
    async function openMenu() {
      // console.log("mobileNavState", mobileNavState);

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
        line1.start({
          backgroundColor: "#050505",
          transition: { duration: 1.5 },
        });
        line3.start({
          backgroundColor: "#050505",
          transition: { duration: 1.5 },
        });

        if (!isLoading) {
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
        {scroll.y <= 300 && (
          <motion.div
            className={styles.container}
            style={style}
            onClick={() => {
              setMobileNavState((prevState) => !prevState);
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
              />
              <motion.div className={styles.line} animate={line2} />
              <motion.div
                className={styles.line}
                initial={{ y: lineGap }}
                animate={line3}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className={styles.mobile_nav} animate={bgHolderAnimation}>
        <div className={styles.fixed_content}>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
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
            <motion.div
              className={styles.mobile_nav_bg}
              //   initial={{ scale: 2 }}
              animate={backgroundAnimation}
            />
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
          {!isLoading && (
            <motion.div
              className={styles.counter_line}
              animate={counterLineAnimation2}
              style={{
                top: `${(scroll.y / height) * 80}%`,
                height: "20%",
                zIndex: 1,
                // borderRadius: "2px",
              }}
            />
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isLoading && (
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
