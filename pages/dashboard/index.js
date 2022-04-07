import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../store/user";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import { useOnlineStatus } from "../../components/hooks/use-check-online";
import LoggedLayout from "../../components/layout/logged-layout";

function DashBoard({ showed, setShowed }) {
  const { user } = useUser();
  const router = useRouter();

  const [loadedName, setLoadedName] = useState();
  const { navClosed } = useLayout();

  const online = useOnlineStatus();

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
      {loadedName && <h1>{loadedName}</h1>}
    </motion.div>
  );
}

DashBoard.getLayout = LoggedLayout;

export default DashBoard;
