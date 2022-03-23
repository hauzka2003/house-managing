import styles from "./hometown-header.module.css";
import { motion, useAnimation } from "framer-motion";
import ImageIcon from "./icon/image";
import { useEffect } from "react";
import { useState } from "react";

const draw = {
  hide: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
  stop: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
  appear: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.001 },
      },
    };
  },
};

function LoadingModal({ isLoading }) {
  const iconContainerAnimation = useAnimation();
  const iconAnimation = useAnimation();
  const quoteAnimation = useAnimation();

  console.log("isLoading", isLoading);

  async function iconLoading() {
    console.log("isLoading in function", isLoading);

    if (isLoading) {
      await iconSequence();
      return iconLoading();
    } else {
      iconAnimation.stop();
      await iconAnimation.start("stop");
    }
  }

  useEffect(() => {
    iconLoading();
  }, [isLoading]);

  async function iconSequence() {
    await iconAnimation.start("hide");
    await iconAnimation.start("appear");
    await iconContainerAnimation.start({
      scale: 1.1,
      y: -20,
      transition: { duration: 0.3 },
    });
    await iconContainerAnimation.start({
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    });
  }

  async function initialAnimation() {
    await iconContainerAnimation.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    });
    await iconContainerAnimation.start({
      scale: 1,
      rotate: [0, 720],
      transition: { duration: 0.5 },
    });
    quoteAnimation.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  }

  useEffect(() => {
    initialAnimation();
  }, []);

  return (
    <>
      <div className={styles.Loading_modal}>
        <motion.div
          className={styles.loading_modal_icon}
          initial={{ y: -20, opacity: 0, scale: 2 }}
          animate={iconContainerAnimation}
        >
          <ImageIcon draw={draw} animate={iconAnimation} />
        </motion.div>
        <motion.div
          className={styles.Loading_modal_quote}
          initial={{ opacity: 0, y: 10 }}
          animate={quoteAnimation}
        >
          Please wait while we prepare full HD images for you...
        </motion.div>
      </div>
    </>
  );
}

export default LoadingModal;
