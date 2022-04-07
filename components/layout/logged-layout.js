import { AnimatePresence } from "framer-motion";
import { useErrorModal } from "../../store/error_modal";
import PageTitle from "./page_title";
import dynamic from "next/dynamic";
import { useUser } from "../../store/user";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SideBar = dynamic(() => import("./sidebar"));
const WelcomeTab = dynamic(() => import("./welcome.js"));

function LoggedLayout({ children }) {
  const { error, setError } = useErrorModal();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);

  return (
    <>
      <div>
        <WelcomeTab />
        <SideBar />
        <PageTitle />
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
      <div
        style={{
          marginTop: "3rem",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default LoggedLayout;
