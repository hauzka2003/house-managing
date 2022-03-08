import Header from "./header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PageTitle from "./page_title";
import styles from "./layout.module.css";
import ErrorModal from "./error_notify";
import { useErrorModal } from "../../store/error_modal";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = dynamic(() => import("./sidebar"));
const WelcomeTab = dynamic(() => import("./welcome.js"));
const links = ["/", "/log-in", "/plans", "/support", "/contact", "/about-us"];

function Layout({ children }) {
  const router = useRouter();
  const { error, setError } = useErrorModal();

  return (
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
      {links.indexOf(router.pathname) != -1 ? (
        <Header />
      ) : (
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
        style={{
          marginTop: "3rem",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
