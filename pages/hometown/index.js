import HomeTownHeader from "../../components/side-project/hometown-header";
import Image from "next/image";
import SideContent from "../../components/side-project/side-content";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import MainContent from "../../components/side-project/main-content";
import { useState, useEffect } from "react";
import LoadingModal from "../../components/side-project/loading-modal";
import VerifyModal from "../../components/side-project/verify-modal";
import DestinationsPage from "../../components/side-project/destinations-page";
import CuisinesPage from "../../components/side-project/cuisine-page";
import CulturesPage from "../../components/side-project/cultures-page";
import BackgroundPage from "../../components/side-project/background-page";

function HomeTownPage() {
  const [isHover, setIsHover] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [onClick, setOnClick] = useState("Home");

  const background1Animation = useAnimation();
  const background2Animation = useAnimation();
  const background3Animation = useAnimation();
  const background4Animation = useAnimation();
  const background5Animation = useAnimation();

  function handlerLoaded() {
    if (imageLoaded) {
      return;
    }
    setIsLoading(true);
  }
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

  useEffect(() => {
    if (onClick === "Home") {
      background1Animation.start({ opacity: 1, transition: { duration: 1 } });
      background1Animation.start({ scale: 1, transition: { duration: 16 } });
    }
  }, [onClick]);

  return (
    <div style={{ display: "flex", backgroundColor: "black" }}>
      <VerifyModal />
      <LoadingModal isLoading={isLoading} />
      <HomeTownHeader onClick={onClick} setOnClick={setOnClick} />

      {onClick === "Home" && (
        <motion.div
          style={{ display: "flex", width: "100%", height: "100%" }}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 30, opacity: 0 }}
          key="home"
        >
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
                key="background"
              >
                <Image
                  src="/hcmc.jpg"
                  alt="HCM view"
                  layout="fill"
                  onLoad={() => {
                    handlerLoaded();
                    setImageLoaded(true);
                  }}
                  onLoadingComplete={() => setIsLoading(false)}
                />
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
        </motion.div>
      )}
      {onClick === "Destinations" && <DestinationsPage />}
      {onClick === "Cuisines" && <CuisinesPage />}
      {onClick === "Cultures" && <CulturesPage />}
      {onClick === "Background" && <BackgroundPage />}
    </div>
  );
}

export default HomeTownPage;
