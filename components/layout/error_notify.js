import { motion } from "framer-motion";
import styles from "./error_notify.module.css";
function ErrorModal({ error, setClose }) {
  if (error) {
    setTimeout(() => {
      setClose(null);
    }, 4000);
  }

  return (
    <motion.div
      className={styles.container}
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      {error}
    </motion.div>
  );
}

export default ErrorModal;
