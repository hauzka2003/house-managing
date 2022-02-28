import Link from "next/link";
import { motion } from "framer-motion";
function SideLink({ style, children, to, whileHover }) {
  const styles = { ...style, cursor: "pointer" };
  return (
    <Link href={to}>
      <motion.a whileHover={whileHover} style={styles}>
        {children}
      </motion.a>
    </Link>
  );
}

export default SideLink;
