import { useLayout } from "../../store/layout";
import styles from "./navigation.module.css";
import { motion, useAnimation } from "framer-motion";
import SettingsIcon from "../icons/setting";
import CloseaMailIcon from "../icons/close_mail";
import BellIcon from "../icons/bell";
import { useUser } from "../../store/user";
import DarkIcon from "../icons/dark_icon";
import AvatarUser from "../icons/avatar";
import { useRouter } from "next/router";

const iconsStyle = {
  minWidth: "25px",
  minHeight: "25px",
  maxWidth: "25px",
  maxHeight: "25px",
  marginLeft: "20px",
  marginRight: "20px",
  cursor: "pointer",
};

function PageTitle() {
  const { navClosed, currentPage } = useLayout();
  const { user } = useUser();
  const router = useRouter();
  const animation = useAnimation();

  function onClicked(page) {
    router.push(page);
  }

  return (
    <motion.div
      className={styles.pagetitle}
      initial={
        navClosed
          ? { left: "120px", width: "calc(100vw - 120px)", y: -100 }
          : { left: "300px", width: "calc(100vw - 300px)", y: -100 }
      }
      animate={
        navClosed
          ? { left: "120px", width: "calc(100% - 120px)", y: 0 }
          : { left: "300px", width: "calc(100% - 300px)", y: 0 }
      }
    >
      <div className={styles.title}>{currentPage}</div>
      <div className={styles.user}>
        <div className={styles.notification}>
          <CloseaMailIcon style={iconsStyle} />
          <BellIcon style={iconsStyle} />
        </div>

        <DarkIcon />
        <SettingsIcon
          style={iconsStyle}
          onClick={() => {
            onClicked("/dashboard/setting");
          }}
          whileHover={{ rotate: 180, transition: { duration: 1 }, scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <AvatarUser />
          <span className={styles.userName}>
            {user?.user_metadata.userName ?? "Guest"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default PageTitle;
