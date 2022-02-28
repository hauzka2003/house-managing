import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import BlobIcon from "../icons/blob";
import UDInforBlock from "./user_display";
import { useLayout } from "../../store/layout";

const UserDisplayInfor = [
  { title: "Using", unit: "time", color: "#BEDCFE" },
  { title: "Used", unit: "token", color: "#FFB7C3" },
  { title: "Ada", unit: "time", color: "#B7FFD8" },
  { title: "Babbage", unit: "time", color: "#E8FFB7" },
  { title: "Curie", unit: "time", color: "#BCF4F5" },
  { title: "Davinci", unit: "time", color: "#C7EFCF" },
  { title: "All Requests", unit: "token", color: "#F1E4E8" },
  { title: "All Responses", unit: "token", color: "#F2F3AE" },
];

function UserProfile() {
  const { navClosed } = useLayout();
  return (
    <motion.div
      className={styles.container}
      initial={navClosed ? { width: "90%" } : { width: "80%" }}
      animate={navClosed ? { width: "90%" } : { width: "80%" }}
    >
      <motion.div
        className={styles.total_token}
        initial={{ scale: 1.5, transition: { duration: 1 } }}
        animate={{ scale: 1, transition: { duration: 1 } }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <BlobIcon
          style={{
            width: "300px",
            height: "300px",
            position: "absolute",
            zIndex: -2,
          }}
          fill="#FFEE88"
        />
        <BlobIcon
          style={{
            width: "310px",
            height: "310px",
            position: "absolute",
            zIndex: -3,
            opacity: 0.1,
          }}
          fill="#7C898B"
          duration={20}
        />
        <div className={styles.total_token_quote1}>You have</div>
        <div className={styles.total_token_quote2}>
          3921
          <motion.span className={styles.token} initial={{ y: -100 }}>
            Tokens
          </motion.span>
        </div>
        <div className={styles.total_token_quote3}>to go</div>
      </motion.div>
      <motion.div className={styles.UserDisplayInfor}>
        {UserDisplayInfor.map((item) => {
          return (
            <UDInforBlock
              title={item.title}
              unit={item.unit}
              color={item.color}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default UserProfile;
