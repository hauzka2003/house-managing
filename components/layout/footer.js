import styles from "./footer.module.css";
import Link from "next/link";

import { useRouter } from "next/router";
import { useLayout } from "../../store/layout";
import { useState, useEffect } from "react";

const links = [
  { name: "PLANS", url: "/plans" },
  { name: "ABOUT US", url: "/about-us" },
  { name: "SUPPORT", url: "/support" },
  { name: "CONTACT", url: "/contact" },
];

function Footer() {
  const router = useRouter();

  const { pageLoading } = useLayout();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  useEffect(() => {
    if (pageLoading.loading) {
      setTimeout(() => {
        setCurrentRoute(pageLoading.url);
      }, 1000);
    }
  }, [pageLoading]);

  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_links}>
        {/* {links.map((link) => {
          if (link.url === router.pathname) {
            return removeCurrentLink(link);
          }
          return (
            <div className={styles.footer_link_container} key={link.url}>
              <div className={styles.footer_link}>
                <Link href={link.url}>{link.name}</Link>
              </div>
            </div>
          );
        })} */}
        {currentRoute !== "/about-us" && (
          <div className={styles.footer_link_container}>
            <div className={styles.footer_link}>
              <Link href={"/about-us"} scroll={false}>
                ABOUT US
              </Link>
            </div>
          </div>
        )}
        {currentRoute !== "/contact" && (
          <div className={styles.footer_link_container}>
            <div className={styles.footer_link}>
              <Link href={"/contact"} scroll={false}>
                CONTACT
              </Link>
            </div>
          </div>
        )}
        {currentRoute !== "/support" && (
          <div className={styles.footer_link_container}>
            <div className={styles.footer_link}>
              <Link href={"/support"} scroll={false}>
                SUPPORT
              </Link>
            </div>
          </div>
        )}
        {currentRoute !== "/plans" && (
          <div className={styles.footer_link_container}>
            <div className={styles.footer_link}>
              <Link href={"/plans"} scroll={false}>
                PLANS
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
