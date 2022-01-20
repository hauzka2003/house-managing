import Header from "./header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
const SideBar = dynamic(() => import("./sidebar"));
const WelcomeTab = dynamic(() => import("./welcome.js"));
const links = ["/", "/log-in", "/plans", "/support", "/contact", "/about-us"];
function Layout({ children }) {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {links.indexOf(router.pathname) != -1 ? (
        <Header />
      ) : (
        <div>
          <SideBar />
          <WelcomeTab />
        </div>
      )}
      <div style={{ marginTop: "3rem", overflow: "hidden", height: "90vh" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
