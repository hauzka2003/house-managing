import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";

function RedeemTab({ clicked }) {
  const { settingTabState } = useLayout();

  return (
    <motion.div
      className={styles.tab_information}
      initial={
        settingTabState.previousTab > 2
          ? { x: 200, transition: { stiffness: 10 }, opacity: 0 }
          : { x: -200, transition: { stiffness: 10 }, opacity: 0 }
      }
      animate={{ x: 0, opacity: 1 }}
      exit={
        settingTabState.currentTab > 2
          ? { x: 200, transition: { duration: 0.3 }, opacity: 0 }
          : { x: -200, transition: { duration: 0.3 }, opacity: 0 }
      }
    >
      redeem
    </motion.div>
  );
}

export default RedeemTab;
