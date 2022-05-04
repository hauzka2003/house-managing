import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useWindowScroll } from "@mantine/hooks";

const LayoutContext = createContext();
function removeDashFromTitle(title) {
  return title.replace(/-/g, " ");
}
function capitalizeFirstLetter(title) {
  return title.charAt(0).toUpperCase() + title.slice(1);
}
function getTitle(title) {
  if (title === "dashboard") {
    return "Home";
  }
  const newTitle = capitalizeFirstLetter(removeDashFromTitle(title));
  if (newTitle === "[user]") {
    return "Profile";
  }
  return newTitle;
}

export function LayoutContextProvider({ children }) {
  const router = useRouter();
  const [navClosed, setNavClosed] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    getTitle(router.pathname.split("/").pop())
  );
  const [settingTabState, setSettingTabState] = useState({
    previousTab: null,
    currentTab: 0,
  });

  const [mobileNavState, setMobileNavState] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();

  function pushPage(page) {
    router.push(page);
  }

  const [inforModal, setInforModal] = useState(false);

  useEffect(() => {
    setCurrentPage(getTitle(router.pathname.split("/").pop()));
    scrollTo({ y: 0 });
  }, [router.pathname]);

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
  function letCurrentPage(page) {
    setCurrentPage(page);
  }

  const content = {
    navClosed: navClosed,
    setNavClosed: toggleNav,
    currentPage: currentPage,
    setCurrentPage: letCurrentPage,
    settingTabState: settingTabState,
    setSettingTabState: setSettingTabState,
    inforModal,
    setInforModal,
    pushPage,
    mobileNavState,
    setMobileNavState,
    scroll,
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
