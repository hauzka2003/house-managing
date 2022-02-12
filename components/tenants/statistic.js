import ArrowUp from "../icons/arrow-up";
import BlobIcon from "../icons/blob";
import styles from "./search_bar.module.css";
import { motion } from "framer-motion";
function StatisticSide() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>Statistics</div>
      <div className={styles.ontime}>
        <BlobIcon
          style={{
            position: "absolute",
            zIndex: -1,
            width: "300px",
            height: "300px",
            transformOrigin: "150px 150px",
          }}
          // animate={{ rotate: 360 }}
        />
        <motion.div className={styles.ontime_circle} />
        <div>On Time</div>
        <div className={styles.percentage_number}>80%</div>
        <div className={styles.dynamicbox}>
          <div>+23%</div>
          <ArrowUp style={{ width: "20px", color: "#43B929" }} />
        </div>
      </div>
    </div>
  );
}

export default StatisticSide;
