import styles from "./tenant_search.module.css";
import { useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import MoneyIcon from "../icons/money";
import ClockIcon from "../icons/clock";
import NoGoodIcon from "../icons/x_circle";
import ArrowDownIcon from "../icons/arrow_down";
import ArrowUpIcon from "../icons/arrow_up";
const options = [
  { name: "Filter", color: "#" },
  { name: "Paid", color: "#A6D49F" },
  { name: "Slightly off", color: "#F4ACB7" },
  { name: "Off paid", color: "#EF5D60" },
];
function TenantsFilter() {
  const [isShowed, setIsShowed] = useState(false);
  const [selected, setSelected] = useState("Filter");
  const [isHovered, setIsHovered] = useState();
  return (
    <AnimateSharedLayout>
      <motion.div
        className={styles.selectoption}
        onClick={() => {
          setIsShowed(!isShowed);
        }}
        animate={
          !isShowed
            ? {
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }
            : {
                borderBottomRLeftRadius: "none",
                borderBottomRRightRadius: "none",
              }
        }
      >
        {isHovered?.name === "default" && (
          <motion.div
            className={styles.box}
            layoutId="filter"
            animate={{ backgroundColor: isHovered?.color, opacity: 0 }}
          />
        )}
        {selected}
        <AnimatePresence>
          {isShowed ? (
            <ArrowUpIcon
              style={{ width: "22px", translateX: "40px" }}
              initial={{ opacity: 0, y: 10 }}
              animate={isShowed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            />
          ) : (
            <ArrowDownIcon
              style={{ width: "22px", translateX: "40px" }}
              initial={{ opacity: 0, y: -10 }}
              animate={!isShowed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isShowed && (
            <motion.div
              className={styles.dropmenu}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              {options.map((option, index) => {
                return (
                  <motion.div
                    className={styles.menuoption}
                    onClick={() => {
                      setSelected(option.name);
                    }}
                    key={option.name}
                    onHoverStart={() => {
                      setIsHovered(option);
                    }}
                    onHoverEnd={() => {
                      setIsHovered({
                        name: "default",
                        color: option.color,
                      });
                    }}
                  >
                    {option.name}
                    {option.name === "Paid" && (
                      <MoneyIcon
                        style={{
                          width: "22px",
                          marginRight: "20px",
                        }}
                        animate={
                          isHovered?.name === "Paid"
                            ? { color: "white" }
                            : { color: option.color }
                        }
                      />
                    )}
                    {option.name === "Off paid" && (
                      <NoGoodIcon
                        style={{
                          width: "22px",
                          marginRight: "20px",
                        }}
                        animate={
                          isHovered?.name === "Off paid"
                            ? { color: "white" }
                            : { color: option.color }
                        }
                      />
                    )}
                    {option.name === "Slightly off" && (
                      <ClockIcon
                        style={{ width: "22px", marginRight: "20px" }}
                        animate={
                          isHovered?.name === "Slightly off"
                            ? { color: "white" }
                            : { color: option.color }
                        }
                      />
                    )}
                    {option.name == isHovered?.name && (
                      <motion.div
                        className={styles.boxmenu}
                        layoutId="filter"
                        animate={{ backgroundColor: option.color }}
                        style={
                          option.name === "Off paid" && {
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
                          }
                        }
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimateSharedLayout>
  );
}

export default TenantsFilter;
