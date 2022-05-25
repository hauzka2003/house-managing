import styles from "./footer.module.css";
import Link from "next/link";

import { useRouter } from "next/router";
import { useLayout } from "../../store/layout";
import { useState, useEffect, useRef } from "react";

const links = [
  { name: "PLANS", url: "/plans" },
  { name: "ABOUT US", url: "/about-us" },
  { name: "SUPPORT", url: "/support" },
  { name: "CONTACT", url: "/contact" },
];

function Footer() {
  const router = useRouter();
  const contactRef = useRef();
  const aboutusRef = useRef();
  const supportRef = useRef();
  const planRef = useRef();

  const { pageLoading, currentDevice } = useLayout();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  function getPageName() {
    if (currentRoute === "/plans") {
      return "PLANS";
    }
    if (currentRoute === "/about-us") {
      return "ABOUT US";
    }
    if (currentRoute === "/support") {
      return "SUPPORT";
    }
    if (currentRoute === "/contact") {
      return "CONTACT";
    }
  }

  // console.log(contactRef.current?.getBoundingClientRect());

  useEffect(() => {
    if (pageLoading.loading) {
      setTimeout(() => {
        setCurrentRoute(pageLoading.url);
      }, 1000);
    }
  }, [pageLoading]);

  return (
    <div className={styles.footer_container}>
      {/* <div className={styles.current_link}>{getPageName()}</div> */}
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
          <div className={styles.footer_link_container} ref={aboutusRef}>
            <div className={styles.footer_link}>
              <Link
                href={"/about-us"}
                scroll={
                  currentDevice.currentDevice === "desktop" ? true : false
                }
              >
                ABOUT US
              </Link>
            </div>
            <div
              className={styles.footer_link}
              style={{
                right: `${
                  aboutusRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              TUS
            </div>
            <div
              className={styles.footer_link}
              style={{
                left: `${
                  aboutusRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              ABOUT
            </div>
            <div style={{ opacity: 0 }}>ABOUT US</div>
          </div>
        )}
        {currentRoute !== "/contact" && (
          <div className={styles.footer_link_container} ref={contactRef}>
            <div className={styles.footer_link}>
              <Link
                href={"/contact"}
                scroll={
                  currentDevice.currentDevice === "desktop" ? true : false
                }
              >
                CONTACT
              </Link>
            </div>
            <div
              className={styles.footer_link}
              style={{
                right: `${
                  contactRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              CONTACT
            </div>
            <div
              className={styles.footer_link}
              style={{
                left: `${
                  contactRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              CONTACT
            </div>
            <div style={{ opacity: 0 }}>CONTACT</div>
          </div>
        )}
        {currentRoute !== "/support" && (
          <div className={styles.footer_link_container} ref={supportRef}>
            <div className={styles.footer_link}>
              <Link
                href={"/support"}
                scroll={
                  currentDevice.currentDevice === "desktop" ? true : false
                }
              >
                SUPPORT
              </Link>
            </div>
            <div
              className={styles.footer_link}
              style={{
                right: `${
                  supportRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              SUPPORT
            </div>
            <div
              className={styles.footer_link}
              style={{
                left: `${
                  supportRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              SUPPORT
            </div>
            <div style={{ opacity: 0 }}>SUPPORT</div>
          </div>
        )}
        {currentRoute !== "/plans" && (
          <div className={styles.footer_link_container} ref={planRef}>
            <div className={styles.footer_link}>
              <Link
                href={"/plans"}
                scroll={
                  currentDevice.currentDevice === "desktop" ? true : false
                }
              >
                PLANS
              </Link>
            </div>
            <div
              className={styles.footer_link}
              style={{
                right: `${
                  planRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              PLANS
            </div>
            <div
              className={styles.footer_link}
              style={{
                left: `${
                  planRef.current?.getBoundingClientRect().width - 50
                }px`,
                opacity: 0.7,
              }}
            >
              PLANS
            </div>
            <div style={{ opacity: 0 }}>PLANS</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
