import Header from "./header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PageTitle from "./page_title";
import styles from "./layout.module.css";
import { AnimatePresence } from "framer-motion";

const SideBar = dynamic(() => import("./sidebar"));
const WelcomeTab = dynamic(() => import("./welcome.js"));
const links = ["/", "/log-in", "/plans", "/support", "/contact", "/about-us"];

function Layout({ children, key }) {
  const router = useRouter();

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
        </div>
      )}
      <div
        style={{
          marginTop: "3rem",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
