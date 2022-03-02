import "../styles/globals.css";
// import Layout from "../components/layout/layout";
import dynamic from "next/dynamic";
// import SideBar from "../components/layout/sidebar";
import { UserContextProvider } from "../store/user";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorModalContextProvider } from "../store/error_modal";
import { LayoutContextProvider } from "../store/layout";
const Layout = dynamic(() => import("../components/layout/layout"));
function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <LayoutContextProvider>
        <ErrorModalContextProvider>
          <UserContextProvider>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <motion.div key={router.route}>
                  <Component {...pageProps} />
                </motion.div>
              </AnimatePresence>
            </Layout>
          </UserContextProvider>
        </ErrorModalContextProvider>
      </LayoutContextProvider>
    </>
  );
}

export default MyApp;
