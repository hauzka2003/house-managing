import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Avvatar = dynamic(() => import("avvvatars-react"), { ssr: false });
import styles from "./avatar.module.css";
// import Image from "next/image";
function AvatarUser({ style, size, radius, email, initial, animate }) {
  return (
    <motion.div
      className={styles.container}
      style={style}
      initial={initial}
      animate={animate}
    >
      <Avvatar value={email} size={size ?? 40} radius={radius} />
    </motion.div>
  );
}
export default AvatarUser;
