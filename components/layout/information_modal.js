import styles from "./information_modal.module.css";
import { motion, useAnimation } from "framer-motion";
import ShieldHalfIcon from "../icons/shield_half_outline";
import { useEffect } from "react";
import { useLayout } from "../../store/layout";
import ArrowBackIcon from "../icons/arrow_back";
import { useState } from "react";
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

function InformationModal() {
  const backgroundAnimation = useAnimation();
  const iconAnimation = useAnimation();
  const iconContainerAnimation = useAnimation();
  const backdropAnimation = useAnimation();
  const borderAnimation = useAnimation();
  const buttonAnimation = useAnimation();
  const contentAnimation = useAnimation();
  const { setInforModal } = useLayout();
  const [email, setEmail] = useState("");

  async function initial() {
    await backdropAnimation.start({
      backdropFilter: "blur(5px)",
      transition: { duration: 1 },
    });
    await iconAnimation.start({
      opacity: 1,
      transition: { duration: 0.5 },
      color: "#fff",
      fill: "#fff",
    });
    await backgroundAnimation.start({
      width: "51%",
      transition: { duration: 0.5 },
    });
    await iconAnimation.start({
      color: "#191919",
      fill: "#191919",
    });
    await iconContainerAnimation.start({
      left: "15%",
      transition: { duration: 0.5 },
    });
    await iconAnimation.start({
      width: "100px",
      height: "100px",
      transition: { duration: 0.5 },
    });
    borderAnimation.start({
      height: "70%",
    });
    buttonAnimation.start({
      opacity: 1,
      transition: { duration: 0.5 },
    });
    contentAnimation.start("show");
  }

  async function submitHandler() {
    const response = await axios.post("/api/setting/account", {
      email,
    });
    console.log(response);
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ backdropFilter: "blur(0px)" }}
        animate={backdropAnimation}
        exit={{
          backdropFilter: "blur(0px)",
          transition: { delay: 1.5, duration: 0.5 },
        }}
        onClick={() => {
          setInforModal(false);
        }}
      />
      <div className={styles.container}>
        <motion.div
          className={styles.back_button}
          initial={{ opacity: 0 }}
          animate={buttonAnimation}
          onClick={() => {
            setInforModal(false);
          }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <ArrowBackIcon style={{ width: "23px", marginRight: "10px" }} />
          <div style={{ paddingLeft: "2px" }}>Back</div>
        </motion.div>
        <motion.div
          className={styles.icon}
          animate={iconContainerAnimation}
          exit={{ opacity: 0 }}
        >
          <ShieldHalfIcon
            // style={{ width: "150px", height: "150px" }}
            initial={{ width: "150px", height: "150px", opacity: 0 }}
            animate={iconAnimation}
          />
        </motion.div>
        <motion.div
          className={styles.background_left}
          initial={{ width: "0%" }}
          animate={backgroundAnimation}
          exit={{ width: "0%", transition: { delay: 0.5, duration: 0.5 } }}
        />
        <motion.div
          className={styles.background_right}
          initial={{ width: "0%" }}
          animate={backgroundAnimation}
          exit={{ width: "0%", transition: { delay: 0.5, duration: 0.5 } }}
        />
        <motion.div className={styles.icon_container} exit={{ opacity: 0 }}>
          <motion.div
            className={styles.icon_container_border}
            initial={{ height: "0%" }}
            animate={borderAnimation}
          />
        </motion.div>
        <motion.div
          className={styles.content_container}
          initial="hidden"
          variants={container}
          animate={contentAnimation}
          exit={{
            opacity: 0,
            transition: { duration: 0.5 },
          }}
        >
          <motion.div className={styles.content_title} variants={item}>
            Update your password
          </motion.div>
          <motion.div className={styles.content_quote} variants={item}>
            Dont worry, just enter your email address and we will set up with a
            new password in no time!
          </motion.div>
          <motion.form
            className={styles.email_input_container}
            variants={item}
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className={styles.email_input_container_title}>
              Email Address
            </div>
            <motion.input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              required
              className={styles.email_input}
              placeholder="example@.com"
              initial={{ boxShadow: "none" }}
              whileFocus={{
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              }}
            />
            <motion.input
              type="submit"
              value="Reset Password"
              className={styles.submit_button}
              initial={{ backgroundColor: "#ffbd19", color: "#020202" }}
              whileHover={{ backgroundColor: "black", color: "#ffbd19" }}
            />
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}

export default InformationModal;
