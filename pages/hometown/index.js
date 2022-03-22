import HomeTownHeader from "../../components/side-project/hometown-header";
import Image from "next/image";
import SideContent from "../../components/side-project/side-content";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import MainContent from "../../components/side-project/main-content";
import { useState, useEffect } from "react";

function HomeTownPage() {
  const [isHover, setIsHover] = useState(null);

  const background1Animation = useAnimation();
  const background2Animation = useAnimation();
  const background3Animation = useAnimation();
  const background4Animation = useAnimation();
  const background5Animation = useAnimation();

  // console.log("isHover", isHover);

  useEffect(() => {
    console.log("isHover", isHover);
    if (isHover === null) {
      background1Animation.start({ opacity: 1, transition: { duration: 1 } });
      background1Animation.start({ scale: 1, transition: { duration: 16 } });
    }
    if (isHover === "background") {
      // background1Animation.stop();
      background2Animation.start({ opacity: 1, transition: { duration: 4 } });
      background2Animation.start({ scale: 1, transition: { duration: 16 } });
    }
    if (isHover === "destinations") {
      background3Animation.start({ opacity: 1, transition: { duration: 1 } });
      background3Animation.start({ scale: 1, transition: { duration: 16 } });
    }
    if (isHover === "cuisines") {
      background4Animation.start({ opacity: 1, transition: { duration: 1 } });
      background4Animation.start({ scale: 1, transition: { duration: 16 } });
    }
    if (isHover === "cultures") {
      background5Animation.start({ opacity: 1, transition: { duration: 1 } });
      background5Animation.start({ scale: 1, transition: { duration: 16 } });
    }
  }, [isHover]);

  useEffect(() => {
    background1Animation.start({ opacity: 1, transition: { duration: 1 } });
    background1Animation.start({ scale: 1, transition: { duration: 16 } });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <HomeTownHeader />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 0,
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        {/* <AnimatePresence exitBeforeEnter> */}
        {isHover === "background" && (
          <motion.div
            initial={{
              width: "100%",
              height: "100%",
              scale: 1.2,
              opacity: 0,
              position: "relative",
            }}
            animate={background2Animation}
            key="background"
            // exit={{ scale: 1.2, opacity: 0 }}
          >
            <Image src="/background.jpg" alt="HCM view" layout="fill" />
          </motion.div>
        )}

        {isHover === "cultures" && (
          <motion.div
            initial={{
              width: "100%",
              height: "100%",
              scale: 1.2,
              opacity: 0,
              position: "relative",
            }}
            animate={background5Animation}
            key="cuisines"
            // exit={{ scale: 1.2, opacity: 0 }}
          >
            <Image src="/culture.jpg" alt="HCM view" layout="fill" />
          </motion.div>
        )}

        {isHover === "cuisines" && (
          <motion.div
            initial={{
              width: "100%",
              height: "100%",
              scale: 1.2,
              opacity: 0,
              position: "relative",
            }}
            animate={background4Animation}
            key="cuisines"
            // exit={{ scale: 1.2, opacity: 0 }}
          >
            <Image src="/cuisine.jpg" alt="HCM view" layout="fill" />
          </motion.div>
        )}
        {isHover === null && (
          <motion.div
            initial={{
              width: "100%",
              height: "100%",
              scale: 1.2,
              opacity: 0,
              position: "relative",
            }}
            animate={background1Animation}
            key="main"
            // exit={{ scale: 1.2, opacity: 0 }}
          >
            <Image src="/hcmc.jpg" alt="HCM view" layout="fill" />
          </motion.div>
        )}
        {isHover === "destinations" && (
          <motion.div
            initial={{
              width: "100%",
              height: "100%",
              scale: 1.2,
              opacity: 0,
              position: "relative",
            }}
            animate={background3Animation}
            key="destinations"
            // exit={{ scale: 1.2, opacity: 0 }}
          >
            <Image src="/destination.jpeg" alt="HCM view" layout="fill" />
          </motion.div>
        )}
        {/* </AnimatePresence> */}
      </div>
      <div
        style={{
          width: "40%",
          minHeight: "100vh",
          position: "relative",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SideContent isHover={isHover} />
      </div>
      <div
        style={{
          width: "60%",
          minHeight: "100vh",
          position: "relative",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MainContent setIsHover={setIsHover} />
      </div>
    </div>
  );
}

export default HomeTownPage;
