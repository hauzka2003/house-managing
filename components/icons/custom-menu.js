import styles from "./custom-menu.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import CustomMenuLink from "./custom-menu-link";
import { useLayout } from "../../store/layout";
import { useEffect } from "react";
import Router from "next/router";
import { useCountUp } from "react-countup";
import { useRef } from "react";

function CustomMenuIcon({ style, links, device }) {
  const lineGap = device === "mobile" ? 10 : 12;

  const line1 = useAnimation();
  const line2 = useAnimation();
  const line3 = useAnimation();
  const bgHolderAnimation = useAnimation();
  const backgroundAnimation = useAnimation();
  const linkAnimation = useAnimation();
  const counterAnimation = useAnimation();
  const counterLineAnimation = useAnimation();

  const { mobileNavState, setMobileNavState } = useLayout();
  const [menuOpen, setMenuOpen] = useState(false);

  const countUpRef = useRef(null);

  const { start, reset, update, pauseResume } = useCountUp({
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

  Router.onRouteChangeStart = () => {
    reset();
    pauseResume();
    counterAnimation.start({
      opacity: 1,
    });

    counterLineAnimation.start({
      height: "20px",
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  };

  Router.onRouteChangeComplete = () => {
    pauseResume();
    start();
    counterLineAnimation.start({
      height: "50px",
      transition: { duration: 1, ease: "easeInOut" },
    });
  };

  useEffect(() => {
    async function openMenu() {
      if (mobileNavState) {
        update(0);
        pauseResume();

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
        await backgroundAnimation.start({
          top: "-5000px",
          transition: { duration: 1.5 },
        });

        line2.start({ left: "0%", transition: { duration: 0.5 } });
        counterAnimation.start({
          opacity: 0,
        });
        counterLineAnimation.start({
          height: "0px",
          transition: { duration: 0 },
        });
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
      <motion.div
        className={styles.container}
        style={style}
        onClick={() => {
          setMobileNavState((prevState) => !prevState);
        }}
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
                  Subsica
                </motion.div>
              </div>

              {links.map((link) => {
                return (
                  <CustomMenuLink
                    link={link}
                    device={device}
                    menuOpen={menuOpen}
                    key={link.name}
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
            <motion.div
              ref={countUpRef}
              className={styles.counter}
              animate={counterAnimation}
            />
            <motion.div
              className={styles.counter_line_container}
              animate={counterLineAnimation}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default CustomMenuIcon;
