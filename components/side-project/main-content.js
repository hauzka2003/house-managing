import MainContentModal from "./main-content-modal";
import classes from "./hometown-header.module.css";
import { motion } from "framer-motion";

const tabs = [
  { name: "background" },
  { name: "destinations" },
  { name: "cuisines" },
  { name: "cultures" },
];

function MainContent({ children, name, setIsHover }) {
  return (
    <div className={classes.main_cotent}>
      {tabs.map((tab) => {
        return (
          <MainContentModal
            name={tab.name}
            setIsHover={setIsHover}
            key={tab.name}
          >
            {tab.name}
          </MainContentModal>
        );
      })}
    </div>
  );
}

export default MainContent;
