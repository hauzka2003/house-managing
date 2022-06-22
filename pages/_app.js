import "../styles/globals.css";
import dynamic from "next/dynamic";
import { UserContextProvider } from "../store/user";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorModalContextProvider } from "../store/error_modal";
import { LayoutContextProvider } from "../store/layout";
import { UseNotificationProvider } from "../components/hooks/use-notification";
import { UseFriendProvider } from "../components/hooks/friend-list";
import { RequestFriendProvider } from "../components/hooks/use-request-friend";
import { PreviousRouteContextProvider } from "../store/previous-route";
import { ParallaxProvider } from "react-scroll-parallax";

const Layout = dynamic(() => import("../components/layout/layout"));
function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <ParallaxProvider>
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
                              <Component {...pageProps} />
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
      </ParallaxProvider>
    </>
  );
}

export default MyApp;
