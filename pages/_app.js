import "../styles/globals.css";
// import Layout from "../components/layout/layout";
import dynamic from "next/dynamic";
// import SideBar from "../components/layout/sidebar";
// import { SpotlightProvider } from "@mantine/spotlight";
import { UserContextProvider } from "../store/user";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorModalContextProvider } from "../store/error_modal";
import { LayoutContextProvider } from "../store/layout";
import { actions } from "../utils/spotlight-provider.ts";

const Layout = dynamic(() => import("../components/layout/layout"));
function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <LayoutContextProvider>
        <ErrorModalContextProvider>
          <UserContextProvider>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                {/* <SpotlightProvider actions={actions}> */}
                {/* <motion.div key={router.pathname}> */}
                <Component {...pageProps} key={router.pathname} />
                {/* </motion.div> */}
                {/* </SpotlightProvider> */}
              </AnimatePresence>
            </Layout>
          </UserContextProvider>
        </ErrorModalContextProvider>
      </LayoutContextProvider>
    </>
  );
}

export default MyApp;
