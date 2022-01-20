import { motion } from "framer-motion";
function BuildingPage() {
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
