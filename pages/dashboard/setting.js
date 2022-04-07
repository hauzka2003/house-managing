import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import UserProfile from "../../components/setting/user_profile";
import LoggedLayout from "../../components/layout/logged-layout";
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
      style={{ height: "100vh" }}
      initial={{ x: -100, opacity: 0 }}
      animate={
        !navClosed
          ? { marginLeft: "300px", x: 0, opacity: 1 }
          : { marginLeft: "120px", x: 0, opacity: 1 }
      }
      exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
    >
      <UserProfile />
    </motion.div>
  );
}
SettingPage.getLayout = LoggedLayout;

export default SettingPage;
