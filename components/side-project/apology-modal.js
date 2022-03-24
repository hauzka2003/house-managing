import { motion } from "framer-motion";
import styles from "./hometown-header.module.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function ApologyModal({ name }) {
  return (
    <motion.div
      className={styles.apology_modal}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className={styles.apology_modal_title} variants={item}>
        Ooops! Unfinished product⏱️
      </motion.div>
      <motion.div className={styles.apology_modal_quotes} variants={item}>
        We sincerely apologize 🙏 for our late web page delivery 🚛
      </motion.div>
      <motion.div className={styles.apology_modal_quotes} variants={item}>
        This page is currently not available yet 😭
      </motion.div>
    </motion.div>
  );
}

export default ApologyModal;
