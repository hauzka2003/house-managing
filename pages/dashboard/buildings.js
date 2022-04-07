import { motion } from "framer-motion";
import { useUser } from "../../store/user";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLayout } from "../../store/layout";
import LoggedLayout from "../../components/layout/logged-layout";
function BuildingPage() {
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
      // initial={{ x: 100, opacity: 0 }}
      animate={!navClosed ? { marginLeft: "300px" } : { marginLeft: "120px" }}
      // exit={{ x: -100, opacity: 0 }}
    ></motion.div>
  );
}

BuildingPage.getLayout = LoggedLayout;

export default BuildingPage;
