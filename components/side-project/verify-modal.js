import styles from "./hometown-header.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import Blob from "../change-password/blob";
import axios from "axios";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const draw = {
  hide: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
  stop: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
  appear: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.001 },
      },
    };
  },
};

function VerifyModal() {
  const [code, setCode] = useState("");
  const [error, setError] = useState();

  const [doneLoading, setDoneLoading] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
    color: "#118AB2",
    backgroundColor: "transparent",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  });

  useEffect(() => {
    const isVerified = localStorage.getItem("isVerified");
    setDoneLoading(JSON.parse(isVerified));
  }, []);

  async function onSubmit(e) {
    setLoading(true);
    e.preventDefault();
    setError(null);
    console.log("code", code);

    if (code.length === 0) {
      setError({ message: "Please enter the code", type: "error" });
      setLoading(false);
      return;
    }

    setError({ message: "Verifying", type: "loading" });

    const response = await fetch(`/api/side-project/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);

    if (response.status === 200) {
      const data = await response.json();

      if (data?.message === "Wrong code") {
        setError({ message: "Invalid code", type: "error" });
        setLoading(false);
        return;
      }
      setError({ message: "Verified", type: "success" });
      localStorage.setItem("isVerified", true);
      setTimeout(() => {
        setDoneLoading(true);
      }, 1000);
      setLoading(false);
    } else {
      setError({ message: "Invalid code", type: "error" });
      setLoading(false);
    }
  }

  const submitButtonAnimation = useAnimation();

  return (
    <>
      <AnimatePresence>
        {!doneLoading && (
          <motion.div
            className={styles.verify_modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                position: "absolute",
                width: "50%",
                height: "100%",
                // backgroundColor: "red",
                zIndex: -1,
              }}
            />
            <div className={styles.verify_modal_side}>
              <div className={styles.element_1} />
              <div className={styles.element_2} />
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
              <div className={styles.information_tab_circle} />
              <div className={styles.verify_modal_side_title}>
                Welcome abroad
              </div>
              <div className={styles.verify_modal_side_quote}>
                Please enter the code that We personally gave to you
              </div>
              <div className={styles.verify_modal_side_quote}>
                For security purposes, please do not share the code to anybody
              </div>
            </div>

            <div className={styles.verify_modal_main}>
              <motion.div
                className={styles.drop}
                initial={{
                  borderRadius: "35% 65% 39% 61% / 54% 46% 54% 46%",
                  //   transform: "translate(-50%, -50%)",
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
              />
              <motion.div className={styles.drop_2} />
              <form className={styles.input_container} onSubmit={onSubmit}>
                <div className={styles.verify_modal_main_title}>
                  Enter your code here
                </div>
                <div className={styles.verify_modal_main_quote}>
                  Upon entered your code, you will be redirected to our content
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  className={styles.error_message}
                  animate={
                    error?.type === "error"
                      ? {
                          opacity: 1,
                          color: "#EF476F",
                        }
                      : error?.type === "success"
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
                  {error?.message}
                </motion.div>
                <motion.input
                  className={styles.input}
                  placeholder="Your received code"
                  required
                  type={`text`}
                  initial={{ boxShadow: "none" }}
                  whileFocus={{
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  }}
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                />
                <motion.input
                  type="submit"
                  className={styles.submit_button}
                  value="VERIFY"
                  style={{ backgroundColor: buttonStyle?.color }}
                  initial={{ backgroundColor: "#118AB2", opacity: 1 }}
                  animate={submitButtonAnimation}
                  whileHover={buttonStyle}
                  disabled={error?.type === "loading" ? true : false}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default VerifyModal;
