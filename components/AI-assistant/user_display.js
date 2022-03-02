import styles from "./user_profile.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function UDInforBlock({ title, unit, color }) {
  const [isHover, setIsHover] = useState(false);
  const [fetchedValue, setFetchedValue] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/openai/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedValue(data.data);
        setIsLoading(false);
      });
  }, []);

  const hover = {
    scale: 1.1,
    position: "relative",
    zIndex: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  };

  return (
    <motion.div
      className={styles.displaybox}
      whileHover={hover}
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => {
        setIsHover(false);
      }}
    >
      <motion.div
        className={styles.background}
        style={{ backgroundColor: color }}
        animate={
          isHover
            ? {
                width: "100%",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }
            : { width: "25%" }
        }
      />
      <motion.div
        className={styles.title}
        animate={isHover ? { marginLeft: "0px" } : { marginLeft: "20px" }}
      >
        {title}
      </motion.div>
      <motion.div
        className={styles.value}
        animate={isHover ? { marginLeft: "0px" } : { marginLeft: "20px" }}
      >
        <div>
          <span>
            {!isLoading && (
              <motion.span
                className={styles.number}
                initial={{
                  opacity: 0,
                  transition: { duration: 1 },
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1 },
                }}
              >
                {fetchedValue}
              </motion.span>
            )}
            {isLoading && (
              <div className={styles.lds_circle}>
                <div />
              </div>
            )}
          </span>
          <span>{fetchedValue > 1 ? unit + "s" : unit}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UDInforBlock;
