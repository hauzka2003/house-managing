import { motion } from "framer-motion";
import UserProfile from "../../../components/AI-assistant/user_profile";
import { useLayout } from "../../../store/layout";

function AIPage() {
  const { navClosed } = useLayout();
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // width: "100vw",
        // height: "100vh",
      }}
      animate={!navClosed ? { marginLeft: "150px" } : { marginLeft: "20px" }}
    >
      <UserProfile />
    </motion.div>
  );
}

export default AIPage;
