import styles from "./avatar.module.css";
import Image from "next/image";
function AvatarUser() {
  return (
    <div className={styles.container}>
      <Image src="/raiden.jpg" alt="avatar" layout="fill" />
    </div>
  );
}
export default AvatarUser;
