import { motion } from "framer-motion";
import UserProfile from "../../../components/AI-assistant/user_profile";
import LoggedLayout from "../../../components/layout/logged-layout";
import { useLayout } from "../../../store/layout";

function AIPage() {
  const { navClosed } = useLayout();
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={
        !navClosed
          ? { marginLeft: "150px", x: 0, opacity: 1 }
          : { marginLeft: "20px", x: 0, opacity: 1 }
      }
      exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
    >
      <UserProfile />
    </motion.div>
  );
}

AIPage.getLayout = LoggedLayout;

export default AIPage;
