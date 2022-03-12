import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLayout } from "../../store/layout";

function SecuritySection() {
  const [isHover, setIsHover] = useState(false);
  const { setInforModal } = useLayout();

  return (
    <div className={styles.account_security}>
      <div className={styles.account_security_title}>Security</div>
      <div className={styles.account_security_quote}>
        Always keep your password. Do not give your password to anyone. If your
        password is exposed, consider changing your password immediately. Or if
        you do not remember your password, you can reset it.
      </div>
      <motion.div
        className={styles.account_security_button}
        animate={
          isHover
            ? {
                backgroundColor: "#fff",
                color: "#FF5A5F",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 30px 30px 30px -15px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }
            : {
                backgroundColor: "#FF5A5F",
                color: "#FEE1C7",
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              }
        }
        onHoverStart={() => {
          setIsHover(true);
        }}
        onHoverEnd={() => {
          setIsHover(false);
        }}
        onClick={() => {
          setInforModal(true);
        }}
      >
        <motion.div
          className={styles.changepssw_style}
          animate={
            isHover
              ? { width: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { width: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_left}
          animate={
            isHover
              ? { height: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { height: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_bottom}
          animate={
            isHover
              ? { width: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { width: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_right}
          animate={
            isHover
              ? { height: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { height: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        Change password
      </motion.div>
    </div>
  );
}

export default SecuritySection;
