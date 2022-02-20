import { motion } from "framer-motion";
import { useUser } from "../../store/user";
import { useEffect } from "react";
import { useRouter } from "next/router";
function BuildingPage() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);
  return (
    <motion.div
      style={{ marginLeft: "300px" }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
    >
      building
    </motion.div>
  );
}

export default BuildingPage;
