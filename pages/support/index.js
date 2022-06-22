import HeaderLayout from "../../components/layout/header-layout";
import { useLayout } from "../../store/layout";
import { useEffect } from "react";
import { motion } from "framer-motion";
function SupportPage() {
  // const { setTotalHeight } = useLayout();
  // useEffect(() => {
  //   setTotalHeight(window.document.documentElement.scrollHeight);
  // }, []);

  return (
    <>
      <motion.div
        style={{ width: "100%", height: "100vh" }}
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: -100,
        }}
      ></motion.div>
    </>
  );
}
SupportPage.getLayout = HeaderLayout;
export default SupportPage;
