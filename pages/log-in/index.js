import classes from "../../styles/Home.module.css";
import LogIn from "../../components/log-in/log-in";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import ErrorModal from "../../components/layout/error_notify";
import { useErrorModal } from "../../store/error_modal";
import HeaderLayout from "../../components/layout/header-layout";
import useWindowDimensions from "../../components/hooks/use-dimension";
import MobileLogIn from "../../components/log-in/mobile-login";
function LogInPage() {
  const router = useRouter();
  const { user } = useUser();
  const { error, setError } = useErrorModal();

  const [currentDimensions, setCurrentDimensions] = useState();

  const { currentDevice, width, height } = useWindowDimensions();

  useEffect(() => {
    setCurrentDimensions(currentDevice);
  }, [currentDevice]);

  if (user) {
    router.push("/dashboard");
  }

  const [moved, setMoved] = useState(false);
  function onMovedHandler(event) {
    setMoved(event);
  }

  return (
    <>
      {currentDimensions === "desktop" && (
        <motion.div
          className={classes.loginpage}
          animate={
            moved
              ? { backgroundColor: "#f43648" }
              : { backgroundColor: "#03a9f4" }
          }
        >
          <AnimatePresence>
            {error && <ErrorModal error={error} setClose={setError} />}
          </AnimatePresence>
          <LogIn onMoved={onMovedHandler} />
        </motion.div>
      )}
      {currentDimensions !== "desktop" && (
        <MobileLogIn device={currentDimensions} />
      )}
    </>
  );
}
LogInPage.getLayout = HeaderLayout;

export default LogInPage;
