import { motion, useAnimation } from "framer-motion";
import SideLink from "../link/side-link";
import HomeIcon from "../icons/home";
import BulbIcon from "../icons/bulb";
import PeopleIcon from "../icons/people";
import BuildingIcon from "../icons/building";
import BarChartIcon from "../icons/bar-chart";
import BillIcon from "../icons/bill";
import SettingsIcon from "../icons/setting";
import styles from "./sidebar.module.css";
import { useLayout } from "../../store/layout";

function SideBarLink({
  to,
  whileHover,
  children,
  onClick,
  clicked,
  iconStyle,
  setCurrentPage,
}) {
  const animation = useAnimation();
  const { navClosed } = useLayout();

  async function sequence() {
    await animation.start("hidden");
    animation.start("visible");
  }

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

  const blackColor = {
    color: "#333",
    backgroundColor: "white",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 30px 30px 30px -15px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  };

  return (
    <SideLink to={to}>
      <motion.div
        className={styles.link}
        onClick={() => {
          onClick(to);
          setCurrentPage(children);
        }}
        animate={
          clicked == to
            ? blackColor
            : { color: "white", backgroundColor: "#6f73d2", fill: "white" }
        }
        whileHover={whileHover}
        onHoverStart={sequence}
        onHoverEnd={() => {
          animation.start("stop");
        }}
      >
        {to === "/dashboard" && (
          <HomeIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        {to === "/dashboard/AI-assistant" && (
          <BulbIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        {to === "/dashboard/tenants" && (
          <PeopleIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        {to === "/dashboard/buildings" && (
          <BuildingIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        {to === "/dashboard/receipt" && (
          <BillIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        {to === "/dashboard/profit" && (
          <BarChartIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        {to === "/dashboard/setting" && (
          <SettingsIcon style={iconStyle} animation={animation} draw={draw} />
        )}
        <motion.div
          className={styles.text}
          // style={navClosed ? { display: "none" } : { opacity: 1 }}
          animate={
            navClosed
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { opacity: 1, transition: { delay: 0.2 } }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </SideLink>
  );
}

export default SideBarLink;
