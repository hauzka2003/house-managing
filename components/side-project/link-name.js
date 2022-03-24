import { motion } from "framer-motion";
import styles from "./hometown-header.module.css";

function LinkName({ name, onClick, selected }) {
  return (
    <motion.div className={styles.link}>
      <motion.div
        onClick={() => {
          onClick(name);
        }}
        whileHover={selected ? {} : { scale: 1.1 }}
      >
        {name}
      </motion.div>
      {selected && (
        <motion.div className={styles.link_dot} layoutId="hometownlink" />
      )}
    </motion.div>
  );
}

export default LinkName;
