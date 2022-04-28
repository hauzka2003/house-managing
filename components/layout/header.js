import BetterLink from "../link/better-link";
import styles from "./navigation.module.css";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../../store/user";
import useWindowDimensions from "../hooks/use-dimension";
import CustomMenuIcon from "../icons/custom-menu";
const links = [
  { name: "Home", url: "/" },
  { name: "Plans", url: "/plans" },
  { name: "About us", url: "/about-us" },
  { name: "Support", url: "/support" },
  { name: "Contact", url: "/contact" },
];
function Header() {
  const router = useRouter();
  const [currentDimension, setCurrentDimension] = useState();
  const { currentDevice } = useWindowDimensions();

  useEffect(() => {
    setCurrentDimension(currentDevice);
  }, [currentDevice]);

  const { user } = useUser();

  const [clicked, setClicked] = useState(router.pathname);

  useEffect(() => {
    setClicked(router.pathname);
  }, [router.pathname]);
  const [hovered, setHovered] = useState();
  return (
    <>
      {currentDimension === "tablet" && (
        <CustomMenuIcon
          style={{
            width: "30px",
            height: "40px",
            position: "fixed",
            // top: "50%",
            top: "10%",
            right: "10%",
            zIndex: "105",
          }}
          links={links}
          device={"tablet"}
        />
      )}
      {currentDimension === "mobile" && (
        <CustomMenuIcon
          style={{
            width: "30px",
            height: "40px",
            position: "fixed",
            // top: "50%",
            top: "10%",
            right: "10%",
            zIndex: "105",
          }}
          links={links}
          device={"mobile"}
        />
      )}
      {currentDimension === "desktop" && (
        <nav
          className={styles.nav}
          style={currentDimension !== "desktop" ? { boxShadow: "none" } : {}}
        >
          <div
            className={styles.brand}
            style={
              currentDevice !== "mobile"
                ? {
                    marginLeft: "3rem",
                    fontSize: "1.5rem",
                    backgroundColor: "transparent",
                  }
                : { marginLeft: "1rem", fontSize: "1.4rem" }
            }
          >
            Subsica
          </div>
          {currentDevice === "desktop" && (
            <div className={styles.navlink}>
              {links.map((link, index) => {
                return (
                  <BetterLink
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={styles.link}
                    to={link.url}
                    type={"nav"}
                    style={{
                      margin: "0 1.5rem",
                      fontSize: "1.2rem",
                      fontFamily: "'Rubik', sans-serif",
                    }}
                    onClick={() => {
                      setClicked(link.url);
                    }}
                    underlined={link.url === clicked}
                    onHoverStart={() => {
                      setHovered(index);
                    }}
                    onHoverEnd={() => {
                      setHovered(undefined);
                    }}
                    hovered={index == hovered}
                  >
                    {link.name}
                  </BetterLink>
                );
              })}
            </div>
          )}

          <BetterLink
            className={styles.login}
            to={user ? "/dashboard" : "/log-in"}
            type={"login"}
            style={
              currentDevice !== "mobile"
                ? {
                    fontSize: "1.3rem",
                    marginRight: "3rem",
                    alignSelf: "center",
                  }
                : {
                    fontSize: "1.2rem",
                    marginRight: "1rem",
                    alignSelf: "center",
                  }
            }
            whileHover={{ scale: 1.1 }}
          >
            {user?.user_metadata?.userName ?? "Log In"}
          </BetterLink>
        </nav>
      )}
    </>
  );
}

export default Header;
