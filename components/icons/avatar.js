import dynamic from "next/dynamic";

const Avvatar = dynamic(() => import("avvvatars-react"), { ssr: false });
import styles from "./avatar.module.css";
// import Image from "next/image";
function AvatarUser({ style, size, radius, email }) {
  return (
    <div className={styles.container} style={style}>
      <Avvatar value={email} size={size ?? 40} radius={radius} />
    </div>
  );
}
export default AvatarUser;
