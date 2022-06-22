import classes from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../../store/user";
import { useRouter } from "next/router";
import { useErrorModal } from "../../store/error_modal";
import HeaderLayout from "../../components/layout/header-layout";
import useWindowDimensions from "../../components/hooks/use-dimension";
import dynamic from "next/dynamic";
import { useLayout } from "../../store/layout";

const MobileLogIn = dynamic(() =>
  import("../../components/log-in/mobile-login")
);
const LogIn = dynamic(() => import("../../components/log-in/log-in"));

const ErrorModal = dynamic(() =>
  import("../../components/layout/error_notify")
);
function LogInPage() {
  const router = useRouter();
  const { user } = useUser();
  const { error, setError } = useErrorModal();
  const [currentDimensions, setCurrentDimensions] = useState();
  const { currentDevice, width, height } = useWindowDimensions();
  const { setTotalHeight } = useLayout();

  useEffect(() => {
    setCurrentDimensions(currentDevice);
  }, [currentDevice]);

  useEffect(() => {
    // setTotalHeight(window.document.documentElement.scrollHeight);

    // const id = setInterval(() => {
    //   setTotalHeight(window.document.documentElement.scrollHeight);
    // }, 3000);

    // return () => {
    //   clearInterval(id);
    // };
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

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
        <MobileLogIn device={currentDimensions} width={width} height={height} />
      )}
    </>
  );
}
LogInPage.getLayout = HeaderLayout;

export default LogInPage;
