import styles from "./custom-menu.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

function CustomMenuIcon({ style, links }) {
  const line1 = useAnimation();
  const line2 = useAnimation();
  const line3 = useAnimation();
  const bgHolderAnimation = useAnimation();
  const backgroundAnimation = useAnimation();

  const [isClicked, setIsClicked] = useState(false);

  //   console.log("isClicked", isClicked);

  async function openMenu() {
    console.log("isClicked", isClicked);

    if (!isClicked) {
      bgHolderAnimation.start({
        display: "contents",
        transition: {
          duration: 0,
        },
      });
      await backgroundAnimation.start({
        top: "300vh",
        transition: { duration: 0 },
      });
      backgroundAnimation.start({
        top: "-75vh",
        transition: { duration: 2 },
      });
      line1.start({ backgroundColor: "#fff", transition: { duration: 2 } });
      line3.start({ backgroundColor: "#fff", transition: { duration: 2 } });
      await line2.start({ left: "100%", transition: { duration: 0.5 } });
      line1.start({ y: 0, rotate: 45, transition: { duration: 0.5 } });
      line3.start({ y: 0, rotate: 315, transition: { duration: 0.5 } });
      return setIsClicked(true);
    }

    if (isClicked) {
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
        top: "-300vh",
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
      </motion.div>

      <motion.div
        className={styles.mobile_nav}
        //   style={!isClicked ? { display: "none" } : { display: "contents" }}
        animate={bgHolderAnimation}
      >
        <div className={styles.fixed_content}>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div className={styles.links_container}>
              {links.map((link) => {
                return <div className={styles.link}>{link.name}</div>;
              })}
            </div>
          </div>
        </div>
        <motion.div
          className={styles.mobile_nav_bg}
          // initial={{ top: "100%" }}
          animate={backgroundAnimation}
        />
      </motion.div>
    </>
  );
}

export default CustomMenuIcon;
