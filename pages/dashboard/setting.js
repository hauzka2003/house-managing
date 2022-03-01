import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
function SettingPage() {
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
      animate={!navClosed ? { marginLeft: "300px" } : { marginLeft: "120px" }}
    ></motion.div>
  );
}

export default SettingPage;
