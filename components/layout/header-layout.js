import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useLayout } from "../../store/layout";
import SmoothScroll from "../../utils/smooth-scroll";
import useWindowDimensions from "../hooks/use-dimension";
import Footer from "./footer";
import styles from "./layout.module.css";

const Header = dynamic(() => import("./header"));

function HeaderLayout({ children }) {
  const { currentDevice } = useWindowDimensions();
  const { pageLoading, initalLoading, setInitalLoading } = useLayout();
  const [currentDimension, setCurrentDimension] = useState();
  const [isOpenPage, setIsOpenPage] = useState(true);

  useEffect(() => {
    if (pageLoading.loading) {
      setIsOpenPage(true);
    }
  }, [pageLoading]);

  useEffect(() => {
    setCurrentDimension(currentDevice);
  }, [currentDevice]);

  return (
    <>
      <Header />

      {currentDimension === "desktop" ? (
        <SmoothScroll>
          <div
            style={
              currentDimension === "desktop"
                ? {
                    marginTop: "3rem",
                    overflowX: "hidden",
                    width: "100%",
                  }
                : {
                    overflowX: "hidden",
                    width: "100%",
                  }
            }
          >
            {children}
            <Footer />
          </div>
        </SmoothScroll>
      ) : (
        // <SmoothScroll>
        <div
          style={
            currentDimension === "desktop"
              ? {
                  marginTop: "3rem",
                  overflowX: "hidden",
                  width: "100%",
                }
              : {
                  overflowX: "hidden",
                  width: "100%",
                }
          }
        >
          {isOpenPage && (
            <div className={styles.fixed_content}>
              <AnimatePresence
                onExitComplete={() => {
                  setIsOpenPage(false);
                  setInitalLoading(false);
                }}
              >
                {pageLoading.loading && (
                  <motion.div
                    className={styles.mobile_nav_bg}
                    initial={initalLoading ? { top: -1000 } : { top: 1500 }}
                    animate={{
                      top: -1000,
                      transition: {
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                    }}
                    exit={{
                      top: -5000,
                      transition: {
                        // delay: 1,
                        duration: 2,
                        ease: "easeInOut",
                      },
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
          {children}
          <Footer />
        </div>
        // {/* </SmoothScroll> */}
      )}
    </>
  );
}

export default HeaderLayout;
