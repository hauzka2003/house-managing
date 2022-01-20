import SearchIcon from "../icons/search";
import styles from "./tenant_search.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
function TenantSearch() {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);
  return (
    <motion.div
      className={styles.searchbox}
      animate={
        isHovered
          ? { width: "210px", transition: { duration: 0.5, delay: 0.2 } }
          : { width: "30px", transition: { duration: 0.5, delay: 0.2 } }
      }
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
    >
      <motion.input type="text" placeholder="Type here to search" />
      <SearchIcon
        style={{
          width: "20px",
          position: "absolute",
          left: "20px",
        }}
        initial={{ left: "20px" }}
        animate={
          isHovered
            ? { x: -10, transition: { duration: 0.5 } }
            : { x: 0, transition: { duration: 0.5 } }
        }
      />
    </motion.div>
  );
}

export default TenantSearch;
