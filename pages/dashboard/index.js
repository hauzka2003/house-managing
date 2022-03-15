import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../store/user";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";

function DashBoard({ showed, setShowed }) {
  const { user } = useUser();
  const router = useRouter();
  const { query } = router;

  const [loadedName, setLoadedName] = useState();
  const { navClosed } = useLayout();
  const [access_token, setAccess_token] = useState();

  //take the access_token from the url after hash

  console.log("query", router.asPath);
  const str = router.asPath.split("#")[1];

  useEffect(() => {
    if (str) {
      const params = new URLSearchParams(str);
      console.log("params", params.get("error_code"));
      if (params.get("error_code") == 404) {
        console.log("access denied");
      } else {
        console.log("access granted");
        setAccess_token(params.get("access_token"));
      }
    }
  }, []);

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
