import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import LockClosedFill from "../icons/lock-closed-fill";
import PersonFillIcon from "../icons/person-fill";
import styles from "./mobile-login.module.css";
import { useParallax } from "react-scroll-parallax";
import LoginFill from "../icons/log-in-fill";
import PeopleFillIcon from "../icons/people-fill";
import StoreInput, { LogIn, SignUp } from "./ultility/login-input";
import { useState, useEffect } from "react";
import { useUser } from "../../store/user";
import ArrowForwardIcon from "../icons/arrow-forward";

function frontUserCheck(userName, password) {
  if (
    userName.trim() === "" ||
    password.trim() === "" ||
    userName.length <= 6
  ) {
    return false;
  }
  return true;
}

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
  const lineLoading = useAnimation();
  const arrowAnimation = useAnimation();

  const [error, setError] = useState(null);
  const [signInerror, setSignInerror] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const [showError, setShowError] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  // console.log("showArrow", showArrow);

  async function signInHandler() {
    // console.log("signInHandler");
    setError(null);

    if (frontUserCheck(state.userName, state.password)) {
      setShowLine(true);
      setLoading(true);

      const response = await LogIn(state.userName, state.password, signIn);
      setLoading(false);
      setError(response);
      setSignInerror(response);
      setShowError(true);
    } else {
      setError({ message: "Please fill in all fields", type: "error" });
      setSignInerror({ message: "Please fill in all fields", type: "error" });
    }
  }

  async function SignUpHandler() {
    setError(null);

    if (!state.email.includes("@")) {
      setShowError(true);
      return setError({ message: "Please enter a valid email", type: "error" });
    }

    if (state.signUpPass.length <= 6 || state.signUpPass.trim() === "") {
      setShowError(true);
      return setError({
        message: "Password must be at least 7 characters",
        type: "error",
      });
    }

    if (state.confirmPass.trim() === "") {
      setShowArrow(true);
      setShowConfirm(true);
      setSignUpError(null);
      return;
    }

    setShowLine(true);
    setLoading(true);

    const response = await SignUp(state);
    setLoading(false);
    setError(response);
    setSignUpError(response);
    setShowError(true);
  }

  useEffect(() => {
    if (toggleSign) {
      if (state.signUpPass.trim() !== "") {
        setShowArrow(true);
      }
      setShowError(signUpError ? true : false);
      setError(signUpError);
    }

    async function closeArrow() {
      await arrowAnimation.start({
        rotate: 540,
        transition: {
          duration: 0.5,
        },
      });
      setShowArrow(false);
    }

    if (!toggleSign) {
      closeArrow();
      setShowError(signInerror ? true : false);
      setError(signInerror);
    }
  }, [toggleSign]);

  useEffect(() => {
    async function loadingLine() {
      await lineLoading.start({
        width: "100%",
        transition: {
          duration: 0.4,
          ease: "easeInOut",
        },
      });
      setShowLine(false);
      arrowAnimation.start({
        opacity: 1,
        transition: {
          delay: 0.5,
        },
      });
    }
    if (loading) {
      setShowLine(true);
      lineLoading.start({
        width: "40%",
        transition: {
          duration: 6,
          ease: "easeInOut",
        },
      });
      arrowAnimation.start({
        opacity: 0,
      });
    }

    if (!loading) {
      loadingLine();
    }
  }, [loading]);

  useEffect(() => {
    async function initalArrow() {
      await arrowAnimation.start({
        left: "47%",
        transition: {
          duration: 0.5,
        },
      });
      arrowAnimation.start({
        rotate: showConfirm ? 540 : 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }

    if (showArrow) {
      initalArrow();
    }
  }, [showArrow]);

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
        {showError && (
          <motion.div
            className={styles.error_container}
            animate={toggleSign ? { bottom: "15%" } : { bottom: "20%" }}
          >
            <div style={{ opacity: 0 }}>Please fill in all fields</div>
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={() => {
                setShowError(false);
              }}
            >
              {error && (
                <motion.div
                  className={styles.error}
                  initial={{ top: "-100%" }}
                  animate={{
                    top: "0%",
                    color: error.type === "error" ? "#C81D25" : "#06D6A0",
                    transition: {
                      duration: 0.5,
                      delay: 0.5,
                    },
                  }}
                  exit={{
                    top: "100%",
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {error.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence exitBeforeEnter>
          {showArrow && (
            <motion.div
              className={styles.arrow_forward}
              onClick={() => {
                if (showConfirm) {
                  arrowAnimation.start({
                    rotate: 0,
                    transition: {
                      duration: 0.5,
                    },
                  });
                } else {
                  arrowAnimation.start({
                    rotate: 540,
                    transition: {
                      duration: 0.5,
                    },
                  });
                }
                setShowConfirm(!showConfirm);
              }}
              initial={{ left: "-100%" }}
              animate={arrowAnimation}
              exit={{ left: "-100%", transition: { duration: 0.5 } }}
            >
              <ArrowForwardIcon style={{ width: "25px" }} title="return" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.sign_line} />

        <motion.div
          className={styles.loading_line_container}
          // initial={{ width: "0%" }}
        >
          <AnimatePresence exitBeforeEnter>
            {showLine && (
              <motion.div
                className={styles.loading_line}
                initial={{ width: "0%" }}
                animate={lineLoading}
                key="loading-line"
                exit={{
                  width: "0%",
                  left: "100%",
                  transition: { duration: 0.5, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {signinView && (
          <motion.div className={styles.sign_input_header_container}>
            <div style={{ opacity: 0 }}>Confirm it</div>
            <AnimatePresence>
              {toggleSign && !showConfirm && (
                <motion.div
                  className={styles.sign_input_header}
                  key="sign-up-header"
                  initial={{ x: -100 }}
                  animate={{ x: 0, transition: { duration: 0.5 } }}
                  exit={{ x: 100, transition: { duration: 0.5 } }}
                >
                  Sign Up
                </motion.div>
              )}
              {!toggleSign && (
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
              {toggleSign && showConfirm && (
                <motion.div
                  className={styles.sign_input_header}
                  key="confirm-header"
                  initial={{ x: -100 }}
                  animate={{ x: 0, transition: { duration: 0.5 } }}
                  exit={{ x: 100, transition: { duration: 0.5 } }}
                >
                  Confirm
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
            overflow: "hidden",
          }}
        >
          <AnimatePresence exitBeforeEnter>
            {!showConfirm && (
              <motion.div
                className={styles.sign_input_holders}
                initial={{ left: "100%" }}
                animate={{ left: "0%", transition: { duration: 0.5 } }}
                exit={{ left: "100%", transition: { duration: 0.5 } }}
                key="sign-up-inputs"
              >
                <motion.div className={styles.sign_input_holder}>
                  <div
                    className={styles.center_container}
                    style={{ width: "25px" }}
                  >
                    <PersonFillIcon
                      style={{ height: "18px", marginRight: "2px" }}
                    />
                  </div>

                  <input
                    className={styles.sign_input}
                    placeholder={
                      toggleSign
                        ? "Your email@example.com"
                        : "Your email or username"
                    }
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
                <motion.div className={styles.sign_input_holder}>
                  <div
                    className={styles.center_container}
                    style={{ width: "25px" }}
                  >
                    <LockClosedFill
                      style={{ width: "20px", marginRight: "2px" }}
                    />
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
              </motion.div>
            )}
            {showConfirm && (
              <motion.div
                className={styles.sign_input_holders}
                initial={{ left: "-100%" }}
                animate={{ left: "0%", transition: { duration: 0.5 } }}
                exit={{ left: "-100%", transition: { duration: 0.5 } }}
                key="confirm-inputs"
              >
                <motion.div className={styles.sign_input_holder}>
                  <div
                    className={styles.center_container}
                    style={{ width: "25px" }}
                  >
                    <PersonFillIcon
                      style={{ height: "18px", marginRight: "2px" }}
                    />
                  </div>

                  <input
                    className={styles.sign_input}
                    placeholder={"Your username"}
                    type={"text"}
                    onChange={(e) => {
                      dispatch({
                        type: "signUpUserName",
                        value: e.target.value,
                      });
                    }}
                    value={state.signUpUN}
                    autoComplete="off"
                  />
                </motion.div>
                <motion.div className={styles.sign_input_holder}>
                  <div
                    className={styles.center_container}
                    style={{ width: "25px" }}
                  >
                    <LockClosedFill
                      style={{ width: "20px", marginRight: "2px" }}
                    />
                  </div>
                  <input
                    className={styles.sign_input}
                    placeholder="Confirm your password"
                    type={"password"}
                    onChange={(e) => {
                      dispatch({ type: "confirmPass", value: e.target.value });
                    }}
                    value={state.confirmPass}
                    autoComplete="off"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          className={styles.sign_button_container}
          onClick={() => {
            if (toggleSign) {
              SignUpHandler();
            } else {
              signInHandler();
            }
          }}
          onViewportEnter={() => {
            setSigninView(true);
          }}
          onViewportLeave={() => {
            setSigninView(false);
            animateSignButton();
          }}
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
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
