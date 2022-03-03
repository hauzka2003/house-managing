import styles from "./avatar.module.css";
import Image from "next/image";
function AvatarUser({ style }) {
  return (
    <div className={styles.container} style={style}>
      <Image src="/raiden.jpg" alt="avatar" layout="fill" />
    </div>
  );
}
export default AvatarUser;
