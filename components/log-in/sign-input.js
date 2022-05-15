import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Image from "next/image";
import LockClosedFill from "../icons/lock-closed-fill";
import PersonFillIcon from "../icons/person-fill";
import styles from "./mobile-login.module.css";
// import { useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import LoginFill from "../icons/log-in-fill";
import PeopleFillIcon from "../icons/people-fill";
import StoreInput, { LogIn } from "./ultility/login-input";
import { useState } from "react";
import { useUser } from "../../store/user";
import { useCountUp } from "react-countup";

function SignInput({
  scroll,
  forwardedRef,
  setSigninView,
  signinView,
  animateSignButton,
  toggleSign,
  setToggleSign,
}) {
  const blackWater = useParallax({
    speed: -10,
    easing: "easeInOutQuad",
    rotate: [45, 90, 0],
    shouldAlwaysCompleteAnimation: true,
  });

  const { dispatch, state } = StoreInput();
  const [loading, setLoading] = useState(false);
  const { signIn } = useUser();

  const [error, setError] = useState(null);

  async function signInHandler() {
    setError(null);
    setLoading(true);
    const response = await LogIn(state.userName, state.password, signIn);
    setLoading(false);
    setError(response);
  }

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
        <AnimatePresence exitBeforeEnter>
          {error && (
            <motion.div
              className={styles.error_container}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                color: error.type === "error" ? "#C81D25" : "#06D6A0",
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              {error.message}
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.sign_line} />
        {signinView && (
          <motion.div className={styles.sign_input_header_container}>
            <div style={{ opacity: 0 }}>Sign Up</div>
            <AnimatePresence>
              {toggleSign ? (
                <motion.div
                  className={styles.sign_input_header}
                  key="sign-up-header"
                  initial={{ x: -100 }}
                  animate={{ x: 0, transition: { duration: 0.5 } }}
                  exit={{ x: 100, transition: { duration: 0.5 } }}
                >
                  Sign Up
                </motion.div>
              ) : (
                <motion.div
                  className={styles.sign_input_header}
                  key="sign-in-header"
                  initial={{ x: -100 }}
                  animate={{ x: 0, transition: { duration: 0.5 } }}
                  exit={{ x: 100, transition: { duration: 0.5 } }}
                >
                  Sign In
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        <div className={styles.sign_changer_holder}>
          <motion.div
            className={styles.sign_changer_login}
            onClick={() => {
              setToggleSign(false);
            }}
            animate={
              toggleSign
                ? { background: "#f4f4f5", opacity: 0.5 }
                : {
                    background: "#050505",
                    opacity: 1,
                    height: "45px",
                    transition: { ease: "easeInOut" },
                  }
            }
          >
            <LoginFill
              animate={
                toggleSign
                  ? { width: "25px", fill: "#050505" }
                  : { fill: "#f4f4f5", width: "25px" }
              }
            />
          </motion.div>
          <motion.div
            className={styles.sign_changer_login}
            animate={
              !toggleSign
                ? { background: "#f4f4f5", opacity: 0.5 }
                : {
                    background: "#050505",
                    opacity: 1,
                    height: "45px",
                    width: "35px",
                    transition: { ease: "easeInOut" },
                  }
            }
            onClick={() => {
              setToggleSign(true);
            }}
          >
            <PeopleFillIcon
              animate={
                !toggleSign
                  ? { width: "18px", fill: "#050505" }
                  : { fill: "#f4f4f5", width: "18px" }
              }
            />
          </motion.div>
        </div>
        <div
          style={{
            width: "100%",
            // top: toggleSign ? "5%" : "0%",
            position: "relative",
            flexFlow: "column",
          }}
        >
          <motion.div
            className={styles.sign_input_holder}
            initial={{ scale: 0 }}
            animate={{ scale: 1, flexGrow: 1 }}
            transition={{ duration: 0.5 }}
            key="sign-up-emailusername"
          >
            <div className={styles.center_container} style={{ width: "25px" }}>
              <PersonFillIcon style={{ height: "18px", marginRight: "2px" }} />
            </div>

            <input
              className={styles.sign_input}
              placeholder={toggleSign ? "Your email" : "Your email or username"}
              type={"text"}
              onChange={(e) => {
                if (toggleSign) {
                  dispatch({ type: "email", value: e.target.value });
                } else {
                  dispatch({ type: "userName", value: e.target.value });
                }
              }}
              value={toggleSign ? state.email : state.userName}
            />
          </motion.div>
          <motion.div
            className={styles.sign_input_holder}
            initial={{ scale: 0 }}
            animate={{ scale: 1, flexGrow: 1 }}
            transition={{ duration: 0.5 }}
            key="sign-up-password"
          >
            <div className={styles.center_container} style={{ width: "25px" }}>
              <LockClosedFill style={{ width: "20px", marginRight: "2px" }} />
            </div>
            <input
              className={styles.sign_input}
              placeholder="Your password"
              type={"password"}
              onChange={(e) => {
                if (toggleSign) {
                  dispatch({ type: "signUpPass", value: e.target.value });
                } else {
                  dispatch({ type: "password", value: e.target.value });
                }
              }}
              value={toggleSign ? state.signUpPass : state.password}
            />
          </motion.div>
        </div>
        <motion.button
          className={styles.sign_button_container}
          onClick={signInHandler}
          onViewportEnter={() => {
            setSigninView(true);
          }}
          onViewportLeave={() => {
            setSigninView(false);
            animateSignButton();
          }}
          disabled={loading}
        >
          <AnimatePresence exitBeforeEnter>
            {!toggleSign && (
              <motion.div
                style={{ height: "100%", display: "flex" }}
                key="sign-in"
                initial={{ x: -100 }}
                animate={{ x: 0, transition: { duration: 0.5 } }}
                exit={{ x: 100, transition: { duration: 0.5 } }}
              >
                <LoginFill style={{ width: "30px", fill: "#fff" }} />
              </motion.div>
            )}
            {toggleSign && (
              <motion.div
                style={{ height: "100%", display: "flex" }}
                key="sign-up"
                initial={{ y: -100 }}
                animate={{ y: 0, transition: { duration: 0.5 } }}
                exit={{ y: 100, transition: { duration: 0.5 } }}
              >
                <PeopleFillIcon style={{ width: "25px", fill: "#fff" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default SignInput;
