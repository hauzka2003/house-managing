import styles from "./sidebar.module.css";
import { useState, useEffect } from "react";
import LogOutIcon from "../icons/log-out";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useUser } from "../../store/user";
import { supabase } from "../../utils/supabase";
import SideBarLink from "./sidebar_link";
import { useLayout } from "../../store/layout";

const links = [
  { name: "/dashboard", icon: "HomeIcon", text: "Home" },
  { name: "/dashboard/tenants", icon: "PeopleIcon", text: "Tenants" },
  { name: "/dashboard/buildings", icon: "BuildingIcon", text: "Buildings" },
  { name: "/dashboard/receipt", icon: "BillIcon", text: "Receipt" },
  { name: "/dashboard/profit", icon: "BillIcon", text: "Profit" },
  { name: "/dashboard/setting", icon: "SettingsIcon", text: "Setting" },
  {
    name: "/dashboard/AI-assistant",
    icon: "BulbIcon",
    text: "AI Assistant",
  },
  { name: "/dashboard/social", icon: "SettingsIcon", text: "Social" },
];

const hover = {
  fill: "#333",
  position: "relative",
  zIndex: 10,
  color: "#333",
  backgroundColor: "white",
  boxShadow:
    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
};

const blackColor = {
  color: "#333",
  backgroundColor: "white",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 30px 30px 30px -15px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
};

const iconsStyle = {
  alignSelf: "center",
  minWidth: "25px",
  minHeight: "25px",
  maxWidth: "25px",
  maxHeight: "25px",
};

function SideBar() {
  const router = useRouter();
  const { signOut } = useUser();
  const { setNavClosed, navClosed, setCurrentPage } = useLayout();
  const [clicked, onClicked] = useState(router.pathname);

  useEffect(() => {
    onClicked(router.pathname);
  }, [router.pathname]);

  return (
    <motion.nav
      initial={{ x: -1000 }}
      className={styles.sidebar}
      animate={
        !navClosed
          ? { width: "250px", x: 0, transition: { duration: 0.3 } }
          : { width: "70px", x: 0, transition: { duration: 0.3 } }
      }
    >
      <ul className={styles.container}>
        <div
          className={styles.branding}
          onClick={() => {
            setNavClosed();
          }}
        >
          BRANDING
        </div>
        <div className={styles.smallcontainer}>
          <div className={styles.elements}>
            {links.map((link) => {
              return (
                <div key={link.name}>
                  <SideBarLink
                    to={link.name}
                    iconStyle={iconsStyle}
                    onClick={onClicked}
                    clicked={clicked}
                    whileHover={hover}
                    setCurrentPage={setCurrentPage}
                  >
                    {link.text}
                  </SideBarLink>
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={signOut}
          style={{ marginBottom: "1.5rem", paddingLeft: "10px" }}
        >
          <motion.div
            className={styles.link}
            onClick={() => {
              onClicked("/dashboard/log-out");
            }}
            animate={
              clicked == "/dashboard/log-out"
                ? blackColor
                : { color: "white", backgroundColor: "#6f73d2" }
            }
            whileHover={hover}
          >
            <LogOutIcon style={iconsStyle} />
            <motion.div
              className={styles.text}
              animate={
                navClosed
                  ? { opacity: 0, transition: { duration: 0.2 } }
                  : { opacity: 1, transition: { delay: 0.2 } }
              }
            >
              Log Out
            </motion.div>
          </motion.div>
        </div>
      </ul>
    </motion.nav>
  );
}
export default SideBar;
