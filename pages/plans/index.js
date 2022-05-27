import HeaderLayout from "../../components/layout/header-layout";
import { useLayout } from "../../store/layout";
import { useEffect } from "react";

function Plans() {
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
Plans.getLayout = HeaderLayout;

export default Plans;
