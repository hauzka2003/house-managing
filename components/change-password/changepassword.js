import LockClosedIcon from "../icons/lock-closed";
import Blob from "./blob";
import styles from "./change-password.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import ErrorIcon from "../icons/error-icon";
import ShieldCheckMarkIcon from "../icons/shield-checkmark";
import axios from "axios";
import ShieldHalfIcon from "../icons/shield_half_outline";

const draw = {
  hidden: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

function ChangePasswordContainer({ token }) {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [clicked, setClicked] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [error, setError] = useState({ message: "", type: null });
  const [buttonStyle, setButtonStyle] = useState({
    color: "#118AB2",
    backgroundColor: "transparent",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  });

  const informationTabAnimation = useAnimation();
  const mainTabTitleAnimation = useAnimation();
  const submitButtonAnimation = useAnimation();
  const errorCircleAnimation = useAnimation();
  const successCircleAnimation = useAnimation();
  const shieldIconAnimation = useAnimation();

  let iconIsLoading = false;

  async function iconSequence() {
    await shieldIconAnimation.start("hidden");
    await shieldIconAnimation.start("visible");
    await shieldIconAnimation.start({
      scale: 1.1,
      y: -20,
      transition: { duration: 0.3 },
    });
    await shieldIconAnimation.start({
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    });
  }

  async function iconLoading() {
    if (iconIsLoading) {
      await iconSequence();
      return iconLoading();
    }
  }

  useEffect(() => {
    if (error?.type === "error") {
      submitButtonAnimation.start({ cursor: "pointer", opacity: 1 });
      informationTabAnimation.start({
        backgroundColor: "#EF476F",
      });
      mainTabTitleAnimation.start({
        color: "#EF476F",
      });
      submitButtonAnimation.start({
        backgroundColor: "#EF476F",
        color: "white",
      });
      setButtonStyle((prevState) => ({
        ...prevState,
        color: "#EF476F",
      }));
      errorCircleAnimation.start("visible");
    }
    if (error?.type === "success") {
      submitButtonAnimation.start({ cursor: "pointer", opacity: 1 });
      informationTabAnimation.start({
        backgroundColor: "#06D6A0",
      });
      mainTabTitleAnimation.start({
        color: "#06D6A0",
      });
      submitButtonAnimation.start({
        backgroundColor: "#06D6A0",
        color: "white",
      });
      setButtonStyle((prevState) => ({
        ...prevState,
        color: "#06D6A0",
      }));
      successCircleAnimation.start("visible");
    }

    if (error?.type === "loading") {
      submitButtonAnimation.start({ cursor: "not-allowed", opacity: 0.5 });
    }
  }, [error]);

  async function submitHandler() {
    setError({ message: "Updating", type: "loading" });

    if (password === "" || confirmPassword === "") {
      iconIsLoading = false;
      shieldIconAnimation.start({ scale: 0, opacity: 0 });
      setError({
        type: "error",
        message: "Please enter a password",
      });
    }
    if (password !== confirmPassword) {
      iconIsLoading = false;
      shieldIconAnimation.start({ scale: 0, opacity: 0 });
      setError({ message: "Passwords do not match", type: "error" });
      return;
    }
    if (!password?.match(/[A-Z]/)) {
      iconIsLoading = false;
      shieldIconAnimation.start({ scale: 0, opacity: 0 });
      setError({
        message: "Password must contain at least 1 capital letter",
        type: "error",
      });
      return;
    }
    if (password.length < 8) {
      iconIsLoading = false;
      shieldIconAnimation.start({ scale: 0, opacity: 0 });
      setError({
        message: "Password must contain at least 8 characters",
        type: "error",
      });
      return;
    }

    shieldIconAnimation.start({ opacity: 1, scale: 1 });
    shieldIconAnimation.start("visible");
    iconIsLoading = true;
    // setLoading(true);

    iconLoading();

    informationTabAnimation.start({
      backgroundColor: "#FFD166",
    });

    mainTabTitleAnimation.start({
      color: "#FFD166",
    });

    submitButtonAnimation.start({
      backgroundColor: "#FFD166",
      color: "white",
    });

    setButtonStyle((prevState) => ({
      ...prevState,
      color: "#FFD166",
    }));

    if (token) {
      await axios
        .post(`/api/password/${access_token}`, {
          password,
        })
        .then((res) => {
          if (res.status === 201) {
            iconIsLoading = false;
            shieldIconAnimation.start({ scale: 0, opacity: 0 });
            // setLoading(false);
            submitButtonAnimation.start({
              cursor: "pointer",
              opacity: 1,
            });
            return setError({
              message: "Password changed successfully",
              type: "success",
            });
          }
        })
        .catch((err) => {
          iconIsLoading = false;
          shieldIconAnimation.start({ scale: 0, opacity: 0 });
          submitButtonAnimation.start({
            cursor: "pointer",
            opacity: 1,
          });
          return setError({
            message: err?.response?.message,
            type: "error",
          });
        });
    }
  }

  return (
    <>
      <motion.div
        className={styles.information_tab}
        animate={informationTabAnimation}
      >
        <div className={styles.element_1} />
        <div className={styles.element_2} />
        {error?.type === "error" && (
          <ErrorIcon
            style={{ width: "120px", position: "absolute", top: "10%" }}
            draw={draw}
            animate={errorCircleAnimation}
            initial="hidden"
          />
        )}

        <ShieldHalfIcon
          style={{ width: "130px", position: "absolute", top: "10%" }}
          draw={draw}
          initial={{
            width: "130px",
            height: "120px",
            opacity: 0,
            originX: "50%",
            originY: "50%",
          }}
          isloading={true}
          animate={shieldIconAnimation}
        />

        {error?.type === "success" && (
          <ShieldCheckMarkIcon
            style={{ width: "130px", position: "absolute", top: "10%" }}
            draw={draw}
            animate={successCircleAnimation}
            initial="hidden"
          />
        )}
        <Blob
          style={{
            position: "absolute",
            zIndex: "99",
            opacity: 0.2,
            top: "10%",
            left: "60%",
            width: "100px",
          }}
        />
        <motion.div className={styles.information_tab_circle} />
        <h2 className={styles.title}>
          {error?.type === null && "Keep it secret!"}
          {error?.type === "error" && "Check the requirements"}
          {error?.type === "success" && "Successfully changed"}
          {error?.type === "loading" && "Updating..."}
        </h2>
        {(error?.type === null || error?.type === "error") && (
          <div className={styles.requirement}>
            Password must be at least 8 characters for security purpose
          </div>
        )}
        {(error?.type === null || error.type === "error") && (
          <div className={styles.requirement}>
            Must contain at least 1 capitalized character
          </div>
        )}
        {(error?.type === null || error?.type === "error") && (
          <div className={styles.requirement}>Confirm password must match</div>
        )}
        {error?.type === "success" && (
          <div className={styles.requirement}>
            Your password has been successfully updated
          </div>
        )}
        {error?.type === "loading" && (
          <div className={styles.requirement}>
            Please wait while we are updating your password
          </div>
        )}
      </motion.div>
      <div className={styles.main_tab}>
        <div className={styles.overflow_container}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <motion.div
              className={styles.drop}
              initial={{
                borderRadius: "35% 65% 39% 61% / 54% 46% 54% 46%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                borderRadius: [
                  "35% 65% 39% 61% / 54% 46% 54% 46%",
                  "45% 55% 67% 33% / 50% 68% 32% 50% ",
                  "41% 59% 22% 78% / 46% 50% 50% 54% ",
                  "51% 49% 39% 61% / 47% 50% 50% 53% ",
                  "35% 65% 39% 61% / 54% 46% 54% 46%",
                ],
                y: [0, 20, 0],
                transition: { duration: 6, repeat: Infinity },
              }}
            />
            <motion.div
              className={styles.drop_1}
              initial={{
                borderRadius: "45% 55% 67% 33% / 50% 68% 32% 50%",
              }}
              animate={{
                borderRadius: [
                  "45% 55% 67% 33% / 50% 68% 32% 50%",
                  "45% 55% 67% 33% / 50% 68% 32% 50%",
                  "29% 71% 57% 43% / 42% 51% 49% 58%",
                  "59% 41% 39% 61% / 62% 58% 42% 38% ",
                  "45% 55% 67% 33% / 50% 68% 32% 50%",
                ],
                transition: { duration: 6, repeat: Infinity },
              }}
              s
            />
            <motion.div className={styles.drop_2} />
          </div>
        </div>
        <form
          className={styles.input_container}
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <motion.h1
            className={styles.input_container_title}
            animate={mainTabTitleAnimation}
          >
            Update Your password
          </motion.h1>
          <div className={styles.input_container_quote}>
            Please enter your password and confirm it
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            className={styles.error_message}
            animate={
              error.type === "error"
                ? {
                    opacity: 1,
                    color: "#EF476F",
                  }
                : error.type === "success"
                ? {
                    opacity: 1,
                    color: "#06D6A0",
                  }
                : {
                    opacity: 1,
                    color: "#FFD166",
                  }
            }
          >
            {error?.message ?? "This is empty"}
          </motion.div>
          <div className={styles.password_container}>
            <div>
              <LockClosedIcon
                style={{ width: "30px", cursor: "pointer" }}
                onClick={() => {
                  setClicked(!clicked);
                }}
                clicked={clicked}
              />
            </div>
            <motion.input
              required
              onCopy={(e) => {
                e.preventDefault();
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
              className={styles.input}
              type={clicked ? "text" : "password"}
              placeholder="Your new password"
              initial={{ boxShadow: "none" }}
              whileFocus={{
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className={styles.password_container}>
            <div>
              <LockClosedIcon
                style={{ width: "30px", cursor: "pointer" }}
                onClick={() => {
                  setConfirmClicked(!confirmClicked);
                }}
                clicked={confirmClicked}
              />
            </div>
            <motion.input
              required
              onCopy={(e) => {
                e.preventDefault();
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
              className={styles.input}
              type={confirmClicked ? "text" : "password"}
              placeholder="Confirm your password"
              initial={{ boxShadow: "none" }}
              whileFocus={{
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <motion.input
            type="submit"
            className={styles.submit_button}
            value="CHANGE"
            style={{ backgroundColor: buttonStyle?.color }}
            initial={{ backgroundColor: "#118AB2", opacity: 1 }}
            animate={submitButtonAnimation}
            whileHover={buttonStyle}
            disabled={error?.type === "loading" ? true : false}
          />
        </form>
      </div>
    </>
  );
}

export default ChangePasswordContainer;
