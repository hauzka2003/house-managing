import { motion } from "framer-motion";
import TenantsSearchBar from "../../components/tenants/search_bar";
import StatisticSide from "../../components/tenants/statistic";
import TotalPeople from "../../components/tenants/total_people";
import styles from "../../styles/tenants.module.css";
function TenantsPage() {
  return (
    <motion.div
      style={{ marginLeft: "300px" }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={styles.container}
    >
      <div className={styles.maincomp}>
        <TotalPeople />
        <TenantsSearchBar />
      </div>
      <div className={styles.rightside}>
        <StatisticSide />
      </div>
    </motion.div>
  );
}

export default TenantsPage;
