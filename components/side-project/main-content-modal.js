import BusIcon from "./icon/bus";
import CalendarIcon from "./icon/calendar";
import CultureIcon from "./icon/culture";
import FoodIcon from "./icon/food";
import styles from "./hometown-header.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const generalStyles = {
  originX: "50%",
  originY: "50%",
};

function MainContentModal({ children, name, setIsHover }) {
  const iconAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const backgroundAnimation = useAnimation();

  async function handleHover() {
    setIsHover(name);
    backgroundAnimation.start({
      width: "500px",
      height: "500px",
      backdropFilter: "blur(3px)",
      transition: { duration: 1 },
    });
    await iconAnimation.start({ y: -30, transition: { duration: 0.5 } });
    await iconAnimation.start({ scale: 0.8, transition: { duration: 0.5 } });
    titleAnimation.start({
      y: 50,
      opacity: 1,
      transition: { duration: 0.5 },
    });
  }

  function handleHoverEnd() {
    setIsHover(null);
    iconAnimation.start({ y: 0, transition: { duration: 0.5 } });
    iconAnimation.start({ scale: 1, transition: { duration: 0.5 } });
    titleAnimation.start({
      y: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    });
    backgroundAnimation.start({
      width: "0px",
      height: "0px",
      backdropFilter: "blur(1px)",
      transition: { duration: 1 },
    });
  }

  return (
    <motion.div
      className={styles.main_modal}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div
        className={styles.main_modal_background}
        animate={backgroundAnimation}
      />
      <motion.div
        className={styles.main_modal_title}
        animate={titleAnimation}
        initial={{ opacity: 0 }}
      >
        {name}
      </motion.div>
      {name === "background" && (
        <motion.div className={styles.main_modal_icon} animate={iconAnimation}>
          <CalendarIcon style={{ fill: "white" }} />
        </motion.div>
      )}
      {name === "destinations" && (
        <motion.div className={styles.main_modal_icon} animate={iconAnimation}>
          <BusIcon style={{ fill: "white" }} />
        </motion.div>
      )}
      {name === "cuisines" && (
        <motion.div className={styles.main_modal_icon} animate={iconAnimation}>
          <FoodIcon style={{ fill: "white" }} />
        </motion.div>
      )}
      {name === "cultures" && (
        <motion.div className={styles.main_modal_icon} animate={iconAnimation}>
          <CultureIcon style={{ fill: "white" }} />
        </motion.div>
      )}
    </motion.div>
  );
}

export default MainContentModal;
