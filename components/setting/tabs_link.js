import { motion, useAnimation } from "framer-motion";
import styles from "./user_profile.module.css";
import PersonIcon from "../icons/person";
import PriceTagIcon from "../icons/price_tag";
import HelpCircleICon from "../icons/help_circle";
import CogIcon from "../icons/cog";
import { useLayout } from "../../store/layout";

function TabsLink({ tab, style, index }) {
  const animation = useAnimation();
  const { setSettingTabState, settingTabState } = useLayout();

  async function sequence() {
    await animation.start("hidden");
    animation.start("visible");
  }

  //   async function sequence2() {
  //     await animation.start({ rotate: -90 });
  //     // await animation.start({ scale: 1.2 });
  //     await animation.start({ rotate: 0 });
  //     animation.start({ scale: 1 });
  //   }

  const draw = {
    hidden: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
    stop: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
    visible: (i) => {
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

  return (
    <motion.div
      className={styles.setting_tab}
      whileHover={{
        backgroundColor: "#D9D9D9",
        // borderTopRightRadius: "0px",
        // borderTopLeftRadius: "0px",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
      animate={
        settingTabState.currentTab === index
          ? { backgroundColor: "#D9D9D9" }
          : {}
      }
      onClick={() => {
        setSettingTabState((prev) => {
          return { previousTab: prev.currentTab, currentTab: index };
        });
      }}
      onHoverStart={() => {
        sequence();
        // tab === "Settings" && sequence2();
      }}
      onHoverEnd={() => {
        animation.start("stop");
      }}
    >
      {tab === "Account" && (
        <PersonIcon style={style} draw={draw} animate={animation} />
      )}
      {tab === "Redeem" && (
        <PriceTagIcon style={style} draw={draw} animate={animation} />
      )}
      {tab === "Help" && (
        <HelpCircleICon style={style} draw={draw} animate={animation} />
      )}
      {tab === "Settings" && (
        <CogIcon style={style} draw={draw} animate={animation} />
      )}
      <motion.div>{tab}</motion.div>
    </motion.div>
  );
}

export default TabsLink;
