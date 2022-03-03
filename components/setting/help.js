import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";

function HelpTab() {
  const { settingTabState } = useLayout();

  return (
    <motion.div
      className={styles.tab_information}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, transition: { duration: 0.3 }, opacity: 0 }}
    >
      help
    </motion.div>
  );
}

export default HelpTab;
