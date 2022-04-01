import styles from "./redeem.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import { useState } from "react";

function RedeemTab({ clicked }) {
  const { settingTabState } = useLayout();
  const [code, setCode] = useState("");

  function hyphenate(str) {
    str = str.split("-").join("");
    let finalStr = str?.match(/.{1,4}/g)?.join("-");
    return finalStr;
  }

  function changeCodeHandler(e) {
    if (e.target.value?.length >= 19) {
      console.log(e.target.value?.length);
      return setCode(hyphenate(e.target.value?.slice(0, 19)));
    }
    setCode(hyphenate(e.target.value));
  }

  return (
    <motion.div
      className={styles.tab_information}
      initial={
        settingTabState.previousTab > 2
          ? { x: 200, transition: { stiffness: 10 }, opacity: 0 }
          : { x: -200, transition: { stiffness: 10 }, opacity: 0 }
      }
      animate={{ x: 0, opacity: 1 }}
      exit={
        settingTabState.currentTab > 2
          ? { x: 200, transition: { duration: 0.3 }, opacity: 0 }
          : { x: -200, transition: { duration: 0.3 }, opacity: 0 }
      }
    >
      <div className={styles.redeem_quotes}>
        If you received our code from any source of communication, please copy
        and paste it in below to obtain our special promotion.
      </div>
      <div className={styles.redeem_warning}>
        The code is 16 characters long
      </div>
      <motion.input
        className={styles.redeem_input}
        type="text"
        placeholder="**** - **** - **** - ****"
        autoCapitalize="on"
        value={code}
        onChange={changeCodeHandler}
        maxLength="19"
        minLength="19"
        onPaste={(e) => {
          e.preventDefault();
          let text = e.clipboardData.getData("text/plain");
          text = text.split("-").join("");
          text = text.slice(0, 16);
          setCode(hyphenate(text));
        }}
        initial={{ boxShadow: "none" }}
        whileFocus={{
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      />
    </motion.div>
  );
}

export default RedeemTab;
