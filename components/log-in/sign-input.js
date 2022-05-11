import { motion } from "framer-motion";
import Image from "next/image";
import LockClosedFill from "../icons/lock-closed-fill";
import PersonFillIcon from "../icons/person-fill";
import styles from "./mobile-login.module.css";
// import { useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import ArrowForwardIcon from "../icons/arrow-forward";

function SignInput({
  scroll,
  forwardedRef,
  setSigninView,
  signinView,
  animateSignButton,
  toggleSign,
}) {
  const blackWater = useParallax({
    speed: -10,
    rotate: [45, 90, 0],
    shouldAlwaysCompleteAnimation: true,
  });

  return (
    <motion.div className={styles.sign_container} ref={forwardedRef}>
      <div className={styles.black_water_end} ref={blackWater.ref}>
        <Image src={"/black-water/01.png"} width={200} height={200} />
      </div>
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
          <div className={styles.center_container} style={{ width: "25px" }}>
            <PersonFillIcon style={{ height: "20px", marginRight: "2px" }} />
          </div>

          <input
            className={styles.sign_input}
            placeholder="Your email or username"
          />
        </div>
        <div className={styles.sign_input_holder}>
          <div className={styles.center_container} style={{ width: "25px" }}>
            <LockClosedFill style={{ width: "20px", marginRight: "2px" }} />
          </div>
          <input className={styles.sign_input} placeholder="Your password" />
        </div>
        <div className={styles.sign_button_container}>
          <div>Sign In</div>
          <div
            style={{
              height: "100%",
              display: "flex",
              position: "absolute",
              right: "10px",
            }}
          >
            <ArrowForwardIcon style={{ width: "20px" }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SignInput;
