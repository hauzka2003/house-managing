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
            color:
              " linear-gradient(90deg, hsla(123, 60%, 62%, 1) 0%, hsla(159, 63%, 71%, 1) 100%)",
          }}
          // animate={{ rotate: 360 }}
        />
        <motion.div className={styles.ontime_circle} />
        <div>On Time</div>
        <div className={styles.percentage_number}>80%</div>
        <div className={styles.dynamicbox}>
          <div className={styles.dynamic_percentage}>+23%</div>
          <ArrowUp style={{ width: "20px", color: "#43B929" }} />
        </div>
      </div>
      <div>Rental Money</div>
    </div>
  );
}

export default StatisticSide;
