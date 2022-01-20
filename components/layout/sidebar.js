import HomeIcon from "../icons/home";
import PersonIcon from "../icons/person";
import SideLink from "../link/side-link";
import styles from "./sidebar.module.css";
import { useState, useEffect } from "react";
import PeopleIcon from "../icons/people";
import BuildingIcon from "../icons/building";
import BarChartIcon from "../icons/bar-chart";
import BillIcon from "../icons/bill";
import SettingsIcon from "../icons/setting";
import LogOutIcon from "../icons/log-out";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useUser } from "../../store/user";
const links = [
  { name: "/dashboard", icon: "HomeIcon" },
  { name: "/tenant", icon: "PeopleIcon" },
  { name: "/building", icon: "BuildingIcon" },
  { name: "/bill", icon: "BillIcon" },
  { name: "/chart", icon: "BarChartIcon" },
  { name: "setting", icon: "SettingsIcon" },
  { name: "/logout", icon: "LogOutIcon" },
];
const hover = {
  position: "relative",
  zIndex: 10,
  color: "#333",
  backgroundColor: "white",
  boxShadow:
    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
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
  const { user } = useUser();

  const blackColor = {
    color: "#333",
    backgroundColor: "white",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 30px 30px 30px -15px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  };
  const [clicked, onClicked] = useState(router.pathname);
  const [isExpanded, setExpanded] = useState(true);
  useEffect(() => {
    onClicked(router.pathname);
  }, [router.pathname]);
  return (
    <motion.nav
      initial={{ x: -1000 }}
      className={styles.sidebar}
      animate={isExpanded ? { width: "250px", x: 0 } : { width: "70px", x: 0 }}
    >
      <ul className={styles.container}>
        <div
          className={styles.branding}
          onClick={() => {
            setExpanded(!isExpanded);
          }}
        >
          BRANDING
        </div>
        <div className={styles.smallcontainer}>
          <div className={styles.elements}>
            <SideLink to={"/dashboard"} whileHover={{ color: "#333" }}>
              <motion.div
                className={styles.link}
                onClick={() => {
                  onClicked("/dashboard");
                }}
                animate={
                  clicked == "/dashboard"
                    ? blackColor
                    : { color: "white", backgroundColor: "#6f73d2" }
                }
                whileHover={hover}
              >
                <HomeIcon style={iconsStyle} />
                <motion.div className={styles.text}>Home</motion.div>
              </motion.div>
            </SideLink>
            <SideLink to={"/dashboard/tenants"}>
              <motion.div
                className={styles.link}
                onClick={() => {
                  onClicked("/dashboard/tenants");
                }}
                animate={
                  clicked == "/dashboard/tenants"
                    ? blackColor
                    : { color: "white", backgroundColor: "#6f73d2" }
                }
                whileHover={hover}
              >
                <PeopleIcon style={iconsStyle} />
                <div className={styles.text}>Tenants</div>
              </motion.div>
            </SideLink>
            <SideLink to={"/dashboard/buildings"}>
              <motion.div
                className={styles.link}
                onClick={() => {
                  onClicked("/dashboard/buildings");
                }}
                animate={
                  clicked == "/dashboard/buildings"
                    ? { ...blackColor, fill: "#333" }
                    : {
                        color: "white",
                        backgroundColor: "#6f73d2",
                        fill: "white",
                      }
                }
                whileHover={{ ...hover, fill: "#333" }}
              >
                <BuildingIcon style={iconsStyle} />
                <div className={styles.text}>Buildings</div>
              </motion.div>
            </SideLink>
            <SideLink to={"/dashboard/receipt"}>
              <motion.div
                className={styles.link}
                onClick={() => {
                  onClicked("/dashboard/receipt");
                }}
                animate={
                  clicked == "/dashboard/receipt"
                    ? blackColor
                    : { color: "white", backgroundColor: "#6f73d2" }
                }
                whileHover={hover}
              >
                <BillIcon style={iconsStyle} />
                <div className={styles.text}>Receipt</div>
              </motion.div>
            </SideLink>
            <SideLink to={"/dashboard/profit"}>
              <motion.div
                className={styles.link}
                onClick={() => {
                  onClicked("/dashboard/profit");
                }}
                animate={
                  clicked == "/dashboard/profit"
                    ? blackColor
                    : { color: "white", backgroundColor: "#6f73d2" }
                }
                whileHover={hover}
              >
                <BarChartIcon style={iconsStyle} />
                <div className={styles.text}>Profit</div>
              </motion.div>
            </SideLink>
            <SideLink to={"/dashboard/setting"}>
              <motion.div
                className={styles.link}
                onClick={() => {
                  onClicked("/dashboard/setting");
                }}
                animate={
                  clicked == "/dashboard/setting"
                    ? blackColor
                    : { color: "white", backgroundColor: "#6f73d2" }
                }
                whileHover={hover}
              >
                <SettingsIcon style={iconsStyle} />
                <div className={styles.text}>Setting</div>
              </motion.div>
            </SideLink>
          </div>
        </div>
        <SideLink
          to={"/dashboard/log-out"}
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
            <div className={styles.text}>Log out</div>
          </motion.div>
        </SideLink>
      </ul>
    </motion.nav>
  );
}
export default SideBar;
