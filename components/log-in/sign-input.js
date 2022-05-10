import { motion } from "framer-motion";
import Image from "next/image";
import LockClosedFill from "../icons/lock-closed-fill";
import PersonFillIcon from "../icons/person-fill";
import styles from "./mobile-login.module.css";
// import { useRef } from "react";

function SignInput({
  scroll,
  forwardedRef,
  setSigninView,
  signinView,
  animateSignButton,
  toggleSign,
}) {
  return (
    <motion.div className={styles.sign_container} ref={forwardedRef}>
      <motion.div
        className={styles.sign_input_container}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
      >
        <div className={styles.black_water_end}>
          <Image src={"/black-water/01.png"} width={150} height={150} />
        </div>
        <motion.div
          className={styles.sign_input_header}
          style={{ opacity: 0 }}
          onViewportEnter={() => {
            setSigninView(true);
          }}
          onViewportLeave={() => {
            setSigninView(false);
            animateSignButton();
          }}
        >
          test
        </motion.div>
        {signinView && (
          <motion.div
            className={styles.sign_input_header}
            transition={{ duration: 1, ease: "easeInOut" }}
            layoutId="sign_button"
          >
            {toggleSign ? "Sign up" : "Sign in"}
          </motion.div>
        )}

        <div className={styles.sign_input_holder}>
          <div className={styles.center_container} style={{ width: "40px" }}>
            <PersonFillIcon style={{ height: "20px" }} />
          </div>

          <input
            className={styles.sign_input}
            placeholder="Your email or username"
          />
        </div>
        <div className={styles.sign_input_holder}>
          <div className={styles.center_container} style={{ width: "40px" }}>
            <LockClosedFill style={{ width: "20px" }} />
          </div>
          <input className={styles.sign_input} placeholder="Your password" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SignInput;
