import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    if (width < 768) {
      return {
        currentDevice: "mobile",
        width,
        height,
      };
    }

    if (width >= 768 && width < 1024) {
      return {
        currentDevice: "tablet",
        width,
        height,
      };
    }

    if (width >= 1024) {
      return {
        currentDevice: "desktop",
        width,
        height,
      };
    }

    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}
