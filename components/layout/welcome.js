import { useUser } from "../../store/user";
import styles from "./welcome.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
function WelcomeTab() {
  const [showed, setShowed] = useState(false);
  const [showedUN, setShowedUN] = useState(false);
  const { user } = useUser();
  const today = new Date();
  const todayHour = today.getHours();
  let greet;
  if (todayHour >= 0 && todayHour < 6) {
    greet = "Welcome back";
  }
  if (todayHour >= 6 && todayHour < 12) {
    greet = "Good Morning";
  }
  if (todayHour >= 12 && todayHour < 18) {
    greet = "Good Afternoon";
  }
  if (todayHour >= 18 && todayHour <= 23) {
    greet = "Good Evening";
  }
  useEffect(() => {
    const lastLogin = window.localStorage.getItem("lastLogin");
    console.log(lastLogin);
    if (
      !lastLogin ||
      todayHour >= parseInt(lastLogin) + 6 ||
      todayHour < parseInt(lastLogin)
    ) {
      setShowed(true);
      setTimeout(() => {
        setShowed(false);
      }, 3000);
      setTimeout(() => {
        setShowedUN(true);
      }, 1200);
      window.localStorage.setItem("lastLogin", todayHour);
    } else {
      setShowed(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {user && showed && (
          <motion.div className={styles.backdrop} exit={{ opacity: 0 }}>
            <motion.div className={styles.container}>
              <motion.span
                initial={{ fontSize: "2rem" }}
                animate={{ fontSize: "1.5rem" }}
                transition={{ duration: 1 }}
                exit={{ fontSize: "2rem" }}
                className={styles.font}
              >
                {greet},{" "}
              </motion.span>
              <AnimatePresence>
                {showedUN && (
                  <motion.span
                    className={styles.font}
                    initial={{ fontSize: "1.5rem", opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    exit={{ fontSize: "2rem" }}
                  >
                    {user?.user_metadata?.userName}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default WelcomeTab;
