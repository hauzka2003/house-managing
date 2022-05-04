import "../styles/globals.css";
// import Layout from "../components/layout/layout";
import dynamic from "next/dynamic";
// import SideBar from "../components/layout/sidebar";
// import { SpotlightProvider } from "@mantine/spotlight";
import { UserContextProvider } from "../store/user";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorModalContextProvider } from "../store/error_modal";
import { LayoutContextProvider } from "../store/layout";
import { UseNotificationProvider } from "../components/hooks/use-notification";
import { UseFriendProvider } from "../components/hooks/friend-list";
import { RequestFriendProvider } from "../components/hooks/use-request-friend";
import { PreviousRouteContextProvider } from "../store/previous-route";

const Layout = dynamic(() => import("../components/layout/layout"));
function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <UserContextProvider>
        {/* <OnlineStatusProvider> */}
        <PreviousRouteContextProvider>
          <UseFriendProvider>
            <UseNotificationProvider>
              <RequestFriendProvider>
                <LayoutContextProvider>
                  <ErrorModalContextProvider>
                    <Layout>
                      <AnimatePresence exitBeforeEnter>
                        {Component.getLayout ? (
                          <Component.getLayout>
                            <Component {...pageProps} key={router.pathname} />
                          </Component.getLayout>
                        ) : (
                          <Component {...pageProps} key={router.pathname} />
                        )}
                      </AnimatePresence>
                    </Layout>
                  </ErrorModalContextProvider>
                </LayoutContextProvider>
              </RequestFriendProvider>
            </UseNotificationProvider>
          </UseFriendProvider>
          {/* </OnlineStatusProvider> */}
        </PreviousRouteContextProvider>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
