import classes from "../../styles/Home.module.css";
import LogIn from "../../components/log-in/log-in";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/layout/layout";
import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import ErrorModal from "../../components/layout/error_notify";
import { useErrorModal } from "../../store/error_modal";
function LogInPage() {
  const router = useRouter();
  const { user } = useUser();
  const { error, setError } = useErrorModal();
  if (user) {
    router.push("/dashboard");
  }
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
      <AnimatePresence>
        {error && <ErrorModal error={error} setClose={setError} />}
      </AnimatePresence>
      <LogIn onMoved={onMovedHandler} />
    </motion.div>
  );
}

export default LogInPage;
