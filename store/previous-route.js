import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const PreviousRouteContext = createContext();

export function PreviousRouteContextProvider({ children }) {
  const [previousRoute, setPreviousRoute] = useState(null);

  const router = useRouter();

  console.log("previousRoute", previousRoute);

  const handleBeforeHistoryChange = (url) => {
    const [nextUrl] = url?.split("?") || [];

    if (nextUrl !== router.asPath) {
      setPreviousRoute(router.asPath);
    }
  };

  useEffect(() => {
    router.events.on("beforeHistoryChange", handleBeforeHistoryChange);

    return () => {
      router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
    };
  }, []);

  const content = {
    previousRoute,
    setPreviousRoute,
  };
  return (
    <PreviousRouteContext.Provider value={content}>
      {children}
    </PreviousRouteContext.Provider>
  );
}

export function usePreviousRoute() {
  const context = useContext(PreviousRouteContext);
  if (context === undefined) {
    throw new Error(
      `usePreviousRoute must be used within a PreviousRouteContextProvider.`
    );
  }
  return context;
}
