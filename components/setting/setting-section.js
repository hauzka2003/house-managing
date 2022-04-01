import { useState, useEffect } from "react";
import styles from "./setting.module.css";
import { useMouse } from "@mantine/hooks";
import { motion, useAnimation } from "framer-motion";
import BellIcon from "../icons/bell";
import LanguageIcon from "../icons/language";
import VolumeHighIcon from "../icons/volume-high";

function SettingSection({ title, children, quote }) {
  const { ref, x, y } = useMouse();
  const [isHover, setIsHover] = useState(false);

  const titleAnimation = useAnimation();

  function clientHover() {
    titleAnimation.start({
      color: "white",
      transition: { duration: 1 },
    });
  }

  function clientEndHover() {
    titleAnimation.start({
      color: "black",
      transition: { duration: 0.5 },
    });
  }

  return (
    <motion.div
      className={styles.setting_section}
      ref={ref}
      onHoverStart={() => {
        setIsHover(true);
        clientHover();
      }}
      onHoverEnd={() => {
        setIsHover(false);
        clientEndHover();
      }}
      animate={
        isHover
          ? {
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px,rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }
          : {
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 0px 0px,rgba(0, 0, 0, 0.22) 0px 0px 0px",
            }
      }
    >
      <motion.div
        className={styles.setting_section_background_container}
        style={{
          top: y - 5000,
          left: x - 5000,
          width: "10000px",
          height: "10000px",
        }}
      >
        <motion.div
          className={styles.setting_section_background}
          animate={
            isHover
              ? {
                  width: "10000px",
                  height: "10000px",
                  transition: { duration: 2 },
                }
              : { width: "0px", height: "0px", transition: { duration: 0.5 } }
          }
        />
      </motion.div>
      <motion.div
        className={styles.setting_section_title}
        animate={titleAnimation}
      >
        {title === "Notifications" && (
          <BellIcon style={{ width: "20px", marginRight: "10px" }} />
        )}
        {title === "Language" && (
          <LanguageIcon style={{ width: "20px", marginRight: "10px" }} />
        )}
        {title === "Sound" && (
          <VolumeHighIcon style={{ width: "20px", marginRight: "10px" }} />
        )}
        <div style={{ marginLeft: "10px" }}>{title}</div>
      </motion.div>
      <motion.div
        className={styles.setting_section_quotes}
        animate={titleAnimation}
      >
        {quote}
      </motion.div>
      <motion.div
        className={styles.setting_section_content}
        animate={titleAnimation}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
export default SettingSection;
