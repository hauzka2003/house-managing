import { motion } from "framer-motion";
import TenantsSearchBar from "../../components/tenants/search_bar";
import StatisticSide from "../../components/tenants/statistic";
import TotalPeople from "../../components/tenants/total_people";
import styles from "../../styles/tenants.module.css";
import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLayout } from "../../store/layout";
import LoggedLayout from "../../components/layout/logged-layout";
function TenantsPage() {
  const { user } = useUser();
  const router = useRouter();
  const { navClosed } = useLayout();

  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);
  return (
    <motion.div
      // style={{ marginLeft: "300px" }}
      initial={{ x: 100, opacity: 0 }}
      animate={
        !navClosed
          ? { marginLeft: "300px", x: 0, opacity: 1 }
          : { marginLeft: "120px", x: 0, opacity: 1 }
      }
      className={styles.container}
      exit={{ x: 100, opacity: 0 }}
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
TenantsPage.getLayout = LoggedLayout;

export default TenantsPage;
