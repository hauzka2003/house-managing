import { motion } from "framer-motion";
import CloseCircleIcon from "../icons/close_circle";
import { useEffect } from "react";
import styles from "./error_notify.module.css";
import CheckMarkCircleIcon from "../icons/checkmark_circle";
import ReloadIcon from "../icons/reload";
function ErrorModal({ error, setClose }) {
  function getQuote(type) {
    if (type === "error") {
      return "Ooops!";
    }
    if (type === "success") {
      return "Success!";
    }
    if (type === "info") {
      return "Just a little bit more...";
    }
  }
  function selectBackgroundColor(type) {
    if (type === "error") {
      return "#e85e6c";
    }
    if (type === "success") {
      return "#47c9a2";
    }
    if (type === "info") {
      return "#F4B860";
    }
  }
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setClose(null);
      }, 10000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const quote = getQuote(error?.type);
  const backgroundColor = selectBackgroundColor(error?.type);
  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 20, opacity: 0.4, transition: { duration: 0.5 } }}
        exit={{ scale: 1, opacity: 0 }}
        onClick={() => {
          setClose(null);
        }}
      />
      <motion.div
        className={styles.container}
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 100, transition: { delay: 0.2 } }}
      >
        <div className={styles.innercontainer}>
          <div
            className={styles.topbackground}
            style={{ backgroundColor: backgroundColor }}
          >
            {error?.type === "error" && (
              <CloseCircleIcon
                style={{ width: "100px", height: "100px", color: "white" }}
                initial={{ originX: "50%", originY: "50%" }}
              />
            )}
            {error?.type === "success" && (
              <CheckMarkCircleIcon
                style={{ width: "100px", height: "100px", color: "white" }}
                initial={{ originX: "50%", originY: "50%" }}
              />
            )}
            {error?.type === "info" && (
              <ReloadIcon
                style={{ width: "100px", height: "100px", color: "white" }}
                initial={{ originX: "50%", originY: "50%" }}
                animate={{
                  rotate: 360,
                  transition: {
                    ease: "linear",
                    duration: 4,
                    repeat: Infinity,
                    damping: 2,
                  },
                }}
                fill="white"
              />
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.quote}>{quote}</div>
            <div
              className={styles.error}
              style={error?.type === "info" ? { marginBottom: "4rem" } : {}}
            >
              {error?.message ?? "Modal is empty"}
            </div>
            {(error?.type === "error" || error?.type === "success") && (
              <div
                onClick={() => {
                  setClose(null);
                }}
                className={styles.closebtn}
                style={{ backgroundColor: backgroundColor }}
              >
                {error?.type === "error" ? "Try again" : "OK"}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ErrorModal;
