import Header from "./header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PageTitle from "./page_title";
import styles from "./layout.module.css";
import ErrorModal from "./error_notify";
import { useErrorModal } from "../../store/error_modal";
import { motion, AnimatePresence } from "framer-motion";
import InformationModal from "./information_modal";
import { useLayout } from "../../store/layout";
import { useUser } from "../../store/user";
import { useEffect } from "react";
import { SpotlightProvider } from "@mantine/spotlight";
import { actions } from "../../utils/spotlight-provider.ts";

const SideBar = dynamic(() => import("./sidebar"));
const WelcomeTab = dynamic(() => import("./welcome.js"));
const links = [
  "/",
  "/log-in",
  "/plans",
  "/support",
  "/contact",
  "/about-us",
  "/change-password",
];

const loggedLinks = [
  "/dashboard",
  "/dashboard/AI-assistant",
  "/dashboard/AI-assistant/AI-assistant",
  "/dashboard/profit",
  "/dashboard/receipt",
  "/dashboard/setting",
  "/dashboard/tenants",
  "/dashboard/buildings",
];

function Layout({ children }) {
  const router = useRouter();
  const { error, setError } = useErrorModal();
  const { inforModal } = useLayout();
  const { user } = useUser();

  useEffect(() => {
    if (
      links.indexOf(router.pathname) == -1 &&
      !user &&
      router.pathname !== "/hometown"
    ) {
      router.push("/log-in");
    }
  }, [user]);

  return (
    <SpotlightProvider actions={actions} searchPlaceholder="Search...">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f4f4f5",
          height: "100vh",
          width: "100vw",
        }}
        className={styles.maincontainer}
      >
        <AnimatePresence>
          {inforModal && (
            <div
              style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                zIndex: "100",
              }}
            >
              <InformationModal />
            </div>
          )}
        </AnimatePresence>
        {links.indexOf(router.pathname) != -1 && <Header />}
        {loggedLinks.indexOf(router.pathname) != -1 && (
          <div>
            <PageTitle />
            <SideBar />
            <WelcomeTab />
            <AnimatePresence exitBeforeEnter>
              {error && (
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    position: "fixed",
                    zIndex: "100",
                  }}
                >
                  <ErrorModal
                    style={{ left: "37%", top: "30vh" }}
                    error={error}
                    setClose={setError}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div
          style={
            router.pathname !== "/hometown"
              ? {
                  marginTop: "3rem",
                  overflowX: "hidden",
                  width: "100%",
                }
              : { overflowX: "hidden", width: "100%" }
          }
        >
          {children}
        </div>
      </div>
    </SpotlightProvider>
  );
}

export default Layout;
