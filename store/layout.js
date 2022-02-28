import { createContext, useState, useContext, useEffect } from "react";

const LayoutContext = createContext();

export function LayoutContextProvider({ children }) {
  const [navClosed, setNavClosed] = useState(false);
  useEffect(() => {
    const isNavClosed = localStorage.getItem("navClosed");
    if (isNavClosed) {
      setNavClosed(JSON.parse(isNavClosed));
    }
  }, [setNavClosed]);
  function toggleNav() {
    setNavClosed(!navClosed);
    localStorage.setItem("navClosed", !navClosed);
  }

  const content = {
    navClosed: navClosed,
    setNavClosed: toggleNav,
  };
  return (
    <LayoutContext.Provider value={content}>{children}</LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error(`useLayout must be used within a LayoutContextProvider.`);
  }
  return context;
}
