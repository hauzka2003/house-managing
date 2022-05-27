import HeaderLayout from "../../components/layout/header-layout";
import { useLayout } from "../../store/layout";
import { useEffect } from "react";
function SupportPage() {
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
SupportPage.getLayout = HeaderLayout;
export default SupportPage;
