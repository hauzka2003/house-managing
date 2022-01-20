import BetterLink from "../link/better-link";
import styles from "./navigation.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../store/user";
const links = [
  { name: "Home", url: "/" },
  { name: "Plans", url: "/plans" },
  { name: "About us", url: "/about-us" },
  { name: "Support", url: "/support" },
  { name: "Contact", url: "/contact" },
];
function Header() {
  const router = useRouter();
  const { user } = useUser();

  const [clicked, setClicked] = useState(router.pathname);
  useEffect(() => {
    setClicked(router.pathname);
  }, [router.pathname]);
  const [hovered, setHovered] = useState();
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Subsica</div>
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
      <BetterLink
        className={styles.login}
        to={user ? "/dashboard" : "/log-in"}
        type={"login"}
        style={{ fontSize: "1.3rem", marginRight: "4rem", alignSelf: "center" }}
        whileHover={{ scale: 1.1 }}
      >
        {user?.user_metadata?.userName ?? "Log In"}
      </BetterLink>
    </nav>
  );
}

export default Header;
