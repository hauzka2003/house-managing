import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useLayout } from "../../store/layout";
import SettingSection from "./setting-section";

const sections = [
  {
    title: "Notifications",
    quote:
      "Turn on if you need us to notify you. You can also turn on phone notification",
    content: "Coming soon ",
  },
  {
    title: "Language",
    quote:
      "You can change your language here to match your preference. We will continue to support more languages in the future",
    content: "Coming soon ",
  },
];

function SettingTab({ clicked }) {
  const { settingTabState } = useLayout();

  return (
    <motion.div
      className={styles.tab_information}
      initial={
        settingTabState.previousTab > 1
          ? { x: 200, transition: { stiffness: 10 }, opacity: 0 }
          : { x: -200, transition: { stiffness: 10 }, opacity: 0 }
      }
      animate={{ x: 0, opacity: 1 }}
      exit={
        settingTabState.currentTab > 1
          ? { x: 200, transition: { duration: 0.3 }, opacity: 0 }
          : { x: -200, transition: { duration: 0.3 }, opacity: 0 }
      }
    >
      {sections.map((section, index) => (
        <SettingSection key={index} title={section.title} quote={section.quote}>
          {section.content}
        </SettingSection>
      ))}
    </motion.div>
  );
}

export default SettingTab;
