import { motion } from "framer-motion";
import ApologyModal from "./apology-modal";

function CuisinesPage() {
  return (
    <motion.div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ApologyModal />
    </motion.div>
  );
}

export default CuisinesPage;
