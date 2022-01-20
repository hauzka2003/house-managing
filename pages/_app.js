import "../styles/globals.css";
// import Layout from "../components/layout/layout";
import dynamic from "next/dynamic";
// import SideBar from "../components/layout/sidebar";
import { UserContextProvider } from "../store/user";
import { AnimatePresence } from "framer-motion";
const Layout = dynamic(() => import("../components/layout/layout"));
function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <AnimatePresence exitBeforeEnter>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
