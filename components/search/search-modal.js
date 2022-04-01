import styles from "./search-modal.module.css";
import { motion } from "framer-motion";
import MiniProfile from "./mini-profile";

function SearchModal({ results, ref }) {
  return (
    <div>
      <motion.div
        className={styles.container}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        ref={ref}
      >
        {results?.map((item) => {
          return <MiniProfile email={item?.email} username={item?.username} />;
        })}
      </motion.div>
    </div>
  );
}

export default SearchModal;
