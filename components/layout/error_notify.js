import { motion } from "framer-motion";
import CloseCircleIcon from "../icons/close_circle";
import { useEffect } from "react";
import styles from "./error_notify.module.css";
function ErrorModal({ error, setClose }) {
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

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 20, opacity: 0.4 }}
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
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100, transition: { delay: 0.2 } }}
      >
        <div className={styles.innercontainer}>
          <div className={styles.topbackground}>
            <CloseCircleIcon
              style={{ width: "100px", height: "100px", color: "white" }}
              initial={{ originX: "50%", originY: "50%" }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.quote}>Ooops!</div>
            <div className={styles.error}>{error}</div>
            <div
              onClick={() => {
                setClose(null);
              }}
              className={styles.closebtn}
            >
              Try again
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ErrorModal;
