import classes from "../../styles/Home.module.css";
import LogIn from "../../components/log-in/log-in";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/layout";
function LogInPage() {
  const [moved, setMoved] = useState(false);
  function onMovedHandler(event) {
    setMoved(event);
  }
  return (
    <motion.div
      className={classes.loginpage}
      animate={
        moved ? { backgroundColor: "#f43648" } : { backgroundColor: "#03a9f4" }
      }
    >
      <LogIn onMoved={onMovedHandler} />
    </motion.div>
  );
}

export default LogInPage;
