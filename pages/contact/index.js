import HeaderLayout from "../../components/layout/header-layout";
import { useEffect } from "react";
import { useLayout } from "../../store/layout";

function ContactPage() {
  const { setTotalHeight } = useLayout();
  // useEffect(() => {
  //   setTotalHeight(window.document.documentElement.scrollHeight);

  //   const id = setInterval(() => {
  //     setTotalHeight(window.document.documentElement.scrollHeight);
  //   }, 10000);

  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
}

ContactPage.getLayout = HeaderLayout;

export default ContactPage;
