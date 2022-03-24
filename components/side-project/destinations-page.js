import { motion } from "framer-motion";
import ApologyModal from "./apology-modal";

function DestinationsPage() {
  return (
    <motion.div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#000000",
        // color: "#fffafb",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ApologyModal />
    </motion.div>
  );
}

export default DestinationsPage;
