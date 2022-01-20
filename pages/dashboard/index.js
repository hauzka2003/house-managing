import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useUser } from "../../store/user";
import { motion } from "framer-motion";
import Layout from "../../components/layout/layout";
function DashBoard({ showed, setShowed }) {
  const { user } = useUser();
  const [loadedName, setLoadedName] = useState();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push({ pathname: "/log-in" });
    } else {
      setLoadedName(user?.user_metadata?.userName);
    }
  }, [user]);
  return (
    <motion.div
      style={{ marginLeft: "300px" }}
      // initial={{ x: 100, opacity: 0 }}
      animate={({ x: 0, opacity: 1 }, showed && { marginLeft: "300px" })}
    >
      {loadedName ?? "ko co veo gi"}
    </motion.div>
  );
}

export default DashBoard;
