import styles from "./layout.module.css";
import { AnimatePresence } from "framer-motion";
import InformationModal from "./information_modal";
import { useLayout } from "../../store/layout";
import { SpotlightProvider } from "@mantine/spotlight";
import { actions } from "../../utils/spotlight-provider.ts";

function Layout({ children }) {
  const { inforModal } = useLayout();

  return (
    <SpotlightProvider actions={actions} searchPlaceholder="Search...">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f4f4f5",
          minHeight: "100vh",
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
        {children}
      </div>
    </SpotlightProvider>
  );
}

export default Layout;
