import HeaderLayout from "../../components/layout/header-layout";
import { useEffect } from "react";
import { useLayout } from "../../store/layout";

function AboutUs() {
  // const { setTotalHeight } = useLayout();
  // useEffect(() => {
  //   setTotalHeight(window.document.documentElement.scrollHeight);
  // }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
}
AboutUs.getLayout = HeaderLayout;

export default AboutUs;
