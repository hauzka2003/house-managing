import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../store/user";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";

function DashBoard({ showed, setShowed }) {
  const { user } = useUser();

  const [loadedName, setLoadedName] = useState();
  const { navClosed } = useLayout();

  useEffect(() => {
    if (!user) {
      router.push({ pathname: "/log-in" });
    } else {
      setLoadedName(user?.user_metadata?.userName);
    }
  }, [user]);
  return (
    <motion.div
      animate={!navClosed ? { marginLeft: "300px" } : { marginLeft: "120px" }}
    >
      {access_token}
    </motion.div>
  );
}

export default DashBoard;
