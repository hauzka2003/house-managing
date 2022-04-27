import styles from "./custom-menu.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { DIVIDER_SIZES } from "@mantine/core";

function CustomMenuIcon({ style, links, device }) {
  const line1 = useAnimation();
  const line2 = useAnimation();
  const line3 = useAnimation();
  const bgHolderAnimation = useAnimation();
  const backgroundAnimation = useAnimation();
  const linkAnimation = useAnimation();

  const [isClicked, setIsClicked] = useState(false);

  async function openMenu() {
    console.log("isClicked", isClicked);

    if (!isClicked) {
      linkAnimation.start({
        top: "100%",
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
      line1.start({ y: 0, rotate: 45, transition: { duration: 0.5 } });
      line3.start({ y: 0, rotate: 315, transition: { duration: 0.5 } });
      linkAnimation.start({
        top: "0%",
        transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
      });
      return setIsClicked(true);
    }

    if (isClicked) {
      linkAnimation.start({
        top: "-100%",
        transition: { duration: 1.5, ease: "easeInOut" },
      });
      line1.start({ y: -15, rotate: 0, transition: { duration: 0.5 } });
      line3.start({ y: 15, rotate: 0, transition: { duration: 0.5 } });
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
      bgHolderAnimation.start({
        display: "none",
        transition: {
          duration: 0,
        },
      });
      return setIsClicked(false);
    }
  }

  return (
    <>
      <motion.div className={styles.container} style={style} onClick={openMenu}>
        <div className={styles.relative_container}>
          <motion.div
            className={styles.line}
            initial={{ y: -15 }}
            animate={line1}
          />
          <motion.div className={styles.line} animate={line2} />
          <motion.div
            className={styles.line}
            initial={{ y: 15 }}
            animate={line3}
          />
        </div>
      </motion.div>

      <motion.div className={styles.mobile_nav} animate={bgHolderAnimation}>
        <div className={styles.fixed_content}>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div className={styles.links_container}>
              {links.map((link) => {
                return (
                  <div className={styles.link_container} key={link.name}>
                    <div className={styles.link_holder}>
                      {link.name.toUpperCase()}
                    </div>

                    <motion.div
                      className={styles.link_name}
                      animate={linkAnimation}
                    >
                      {link.name.toUpperCase()}
                    </motion.div>
                  </div>
                );
              })}
            </div>
            <motion.div
              className={styles.mobile_nav_bg}
              //   initial={{ scale: 2 }}
              animate={backgroundAnimation}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default CustomMenuIcon;
