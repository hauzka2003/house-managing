import styles from "./user_profile.module.css";
import TabsLink from "./tabs_link";
import AccountTab from "./account";
import HelpTab from "./help";
import RedeemTab from "./redeem";
import SettingTab from "./settings";
import { AnimatePresence } from "framer-motion";
import { useLayout } from "../../store/layout";

const tabs = [
  { name: "Account" },
  { name: "Settings" },
  { name: "Redeem" },
  { name: "Help" },
];

const iconsStyle = {
  top: "50%",
  position: "absolute",
  left: "10%",
  transform: "translate(0, -50%)",
  minWidth: "20px",
  minHeight: "20px",
  maxWidth: "20px",
  maxHeight: "20px",
};

function UserProfile() {
  const { settingTabState } = useLayout();

  return (
    <div className={styles.setting_container}>
      <div className={styles.navigation}>
        {tabs.map((tab, index) => {
          return (
            <TabsLink
              index={index}
              tab={tab.name}
              style={iconsStyle}
              settingTabState={settingTabState}
              key={tab.name}
            />
          );
        })}
      </div>

      <AnimatePresence exitBeforeEnter>
        {settingTabState.currentTab == 0 && (
          <AccountTab key={settingTabState.currentTab} />
        )}
        {settingTabState.currentTab == 1 && (
          <SettingTab key={settingTabState.currentTab} />
        )}
        {settingTabState.currentTab == 2 && (
          <RedeemTab key={settingTabState.currentTab} />
        )}
        {settingTabState.currentTab == 3 && (
          <HelpTab key={settingTabState.currentTab} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserProfile;
