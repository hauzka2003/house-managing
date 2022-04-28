import styles from "./custom-menu.module.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
function CustomMenuLink({ link, device, menuOpen, delay }) {
  const linkAnimation = useAnimation();

  useEffect(() => {
    async function openMenu() {
      await linkAnimation.start({
        top: "100%",
        transition: { duration: 0 },
      });
      return linkAnimation.start({
        top: "0%",
        transition: { duration: 1.5, delay: delay, ease: "easeInOut" },
      });
    }

    if (menuOpen) {
      openMenu();
    }

    if (!menuOpen) {
      return linkAnimation.start({
        top: "-100%",
        transition: { duration: 1.5, ease: "easeInOut" },
      });
    }
  }, [menuOpen]);

  return (
    <div>
      <div className={styles.link_container}>
        <div
          className={styles.link_holder}
          style={
            device === "mobile" ? { fontSize: "2.2rem" } : { fontSize: "3rem" }
          }
        >
          {link.name.toUpperCase()}
        </div>

        <motion.div
          className={styles.link_name}
          animate={linkAnimation}
          style={
            device === "mobile"
              ? { fontSize: "1.2rem" }
              : { fontSize: "1.6rem" }
          }
        >
          <Link href={link.url}>{link.name.toUpperCase()}</Link>
        </motion.div>
      </div>
    </div>
  );
}

export default CustomMenuLink;
