// import Header from "./header";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import useWindowDimensions from "../hooks/use-dimension";
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
      </div>
    </>
  );
}

export default HeaderLayout;
