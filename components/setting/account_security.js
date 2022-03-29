import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLayout } from "../../store/layout";
import { useUser } from "../../store/user";

function SecuritySection() {
  const [isHover, setIsHover] = useState(false);
  const [isHover2, setIsHover2] = useState(false);

  const { setInforModal } = useLayout();
  const { signOut } = useUser();

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
                color: "#ffbd19",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 30px 30px 30px -15px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }
            : {
                backgroundColor: "#ffbd19",
                color: "black",
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
          style={{ backgroundColor: "#ffbd19" }}
          animate={
            isHover
              ? { width: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { width: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_left}
          style={{ backgroundColor: "#ffbd19" }}
          animate={
            isHover
              ? { height: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { height: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_bottom}
          style={{ backgroundColor: "#ffbd19" }}
          animate={
            isHover
              ? { width: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { width: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_right}
          style={{ backgroundColor: "#ffbd19" }}
          animate={
            isHover
              ? { height: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { height: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        Change password
      </motion.div>
      <motion.div
        className={styles.account_security_button}
        animate={
          isHover2
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
          setIsHover2(true);
        }}
        onHoverEnd={() => {
          setIsHover2(false);
        }}
        onClick={() => {
          signOut();
        }}
      >
        <motion.div
          className={styles.changepssw_style}
          animate={
            isHover2
              ? { width: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { width: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_left}
          animate={
            isHover2
              ? { height: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { height: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_bottom}
          animate={
            isHover2
              ? { width: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { width: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        <motion.div
          className={styles.changepssw_style_right}
          animate={
            isHover2
              ? { height: "100%", opacity: 1, transition: { duration: 0.7 } }
              : { height: "1px", opacity: 0, transition: { duration: 0.7 } }
          }
        />
        Log Out
      </motion.div>
    </div>
  );
}

export default SecuritySection;
