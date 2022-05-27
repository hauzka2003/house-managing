import styles from "./footer.module.css";

import { useRouter } from "next/router";
import { useLayout } from "../../store/layout";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useTransform,
  useViewportScroll,
  useSpring,
} from "framer-motion";
import FooterLink from "./footer-link";
import Image from "next/image";

const links = [
  { name: "PLANS", url: "/plans" },
  { name: "ABOUT US", url: "/about-us" },
  { name: "SUPPORT", url: "/support" },
  { name: "CONTACT", url: "/contact" },
];

function Footer() {
  const router = useRouter();
  const { scrollY } = useViewportScroll();
  const currentRouteRef = useRef(null);
  const currentRouteRef1 = useRef(null);

  const { pageLoading, currentDevice, totalHeight } = useLayout();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  const y = useTransform(scrollY, [totalHeight - 450, totalHeight], [-400, 0]);

  const stringx = useSpring(totalHeight ? y : null, {
    stiffness: 400,
    damping: 90,
  });

  const x = useTransform(scrollY, [totalHeight - 450, totalHeight], [400, 0]);

  const stringx1 = useSpring(totalHeight ? x : null, {
    stiffness: 400,
    damping: 90,
  });

  const string = useSpring(totalHeight ? y : null, {
    stiffness: 400,
    damping: 90,
  });

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

  useEffect(() => {
    if (pageLoading.loading) {
      setTimeout(() => {
        setCurrentRoute(pageLoading.url);
      }, 1000);
    }
  }, [pageLoading]);

  return (
    <div className={styles.footer_container}>
      <motion.div
        className={styles.black_water_center}
        style={{
          y: string,
        }}
        initial={{
          y: -450,
        }}
      >
        <Image src={"/black-water/01.png"} width={550} height={400} />
      </motion.div>

      <motion.div
        className={styles.current_link}
        ref={currentRouteRef}
        style={{
          x: stringx,
          left: `-${
            currentRouteRef.current?.getBoundingClientRect().width / 2
          }px`,
        }}
      >
        {getPageName()}
      </motion.div>
      <motion.div
        className={styles.current_link}
        ref={currentRouteRef1}
        style={{
          x: stringx1,
          right: `-${
            currentRouteRef.current?.getBoundingClientRect().width / 2
          }px`,
          top: "55%",
        }}
      >
        {getPageName()}
      </motion.div>
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
          <FooterLink
            href={"/about-us"}
            currentDevice={currentDevice}
            left={"TUS"}
            right={"ABOUT"}
            name={"ABOUT US"}
            totalHeight={totalHeight}
          />
        )}
        {currentRoute !== "/contact" && (
          <FooterLink
            href={"/contact"}
            currentDevice={currentDevice}
            left={"CONTACT"}
            right={"CONTACT"}
            name={"CONTACT"}
            totalHeight={totalHeight}
          />
        )}
        {currentRoute !== "/support" && (
          <FooterLink
            href={"/support"}
            currentDevice={currentDevice}
            left={"SUPPORT"}
            right={"SUPPORT"}
            name={"SUPPORT"}
            totalHeight={totalHeight}
          />
        )}
        {currentRoute !== "/plans" && (
          <FooterLink
            href={"/plans"}
            currentDevice={currentDevice}
            left={"PLANS"}
            right={"PLANS"}
            name={"PLANS"}
            totalHeight={totalHeight}
          />
        )}
      </div>
    </div>
  );
}

export default Footer;
