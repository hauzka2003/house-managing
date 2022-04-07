// import Header from "./header";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./header"));

function HeaderLayout({ children }) {
  return (
    <>
      <Header />
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

export default HeaderLayout;
