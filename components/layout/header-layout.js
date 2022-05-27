// import Header from "./header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import SmoothScroll from "../../utils/smooth-scroll";
import useWindowDimensions from "../hooks/use-dimension";
import Footer from "./footer";
const Header = dynamic(() => import("./header"));

function HeaderLayout({ children }) {
  const { currentDevice } = useWindowDimensions();
  const [currentDimension, setCurrentDimension] = useState();

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
      )}
    </>
  );
}

export default HeaderLayout;
