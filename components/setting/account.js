import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import AvatarUser from "../icons/avatar";
import { useUser } from "../../store/user";
import { useEffect, useState } from "react";

function AccountTab() {
  const { settingTabState } = useLayout();
  const { user } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState();

  useEffect(() => {
    if (user) {
      // setAvatar(user.avatar);
      setName(user?.user_metadata.userName);
    }
  }, [user]);

  return (
    <motion.div
      className={styles.tab_information}
      initial={
        settingTabState.previousTab >= 0
          ? { x: 200, transition: { stiffness: 10 }, opacity: 0 }
          : { x: -200, transition: { stiffness: 10 }, opacity: 0 }
      }
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, transition: { duration: 0.3 }, opacity: 0 }}
    >
      <div className={styles.personal_pro}>
        <AvatarUser
          style={{
            width: "150px",
            height: "150px",
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px,rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        />
        <div className={styles.personal_pro_info}>
          <div className={styles.personal_name}>Nguyen Phung Hung</div>
          <div className={styles.user_name}>{name}</div>
        </div>
        <div className={styles.signature_container}>
          <div className={styles.signature}>Signature</div>
          <textarea
            className={styles.biography}
            maxLength="150"
            placeholder={"Begin with introduce yourself"}
          />
        </div>
      </div>

      <div className={styles.detail_profile}>
        <div className={styles.personal_name_input}>
          <div>
            <div className={styles.signature}>First Name</div>
            <input className={styles.normal_input} placeholder={"First name"} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AccountTab;
