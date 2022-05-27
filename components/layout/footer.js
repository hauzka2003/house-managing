import styles from "./footer.module.css";
import Link from "next/link";

import { useRouter } from "next/router";
import { useLayout } from "../../store/layout";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import FooterLink from "./footer-link";

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

  const { pageLoading, currentDevice, totalHeight } = useLayout();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  // const contactParallax = useParallax({
  //   translateY: [100, 0],
  //   shouldAlwaysCompleteAnimation: true,
  // });
  // const aboutusParallax = useParallax({
  //   translateY: [100, 0],
  //   shouldAlwaysCompleteAnimation: true,
  // });
  // const supportParallax = useParallax({
  //   translateY: [100, 0],
  //   shouldAlwaysCompleteAnimation: true,
  // });
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  // const [totalHeight, setTotalHeight] = useState(0);
  const { scrollY } = useViewportScroll();
  // start animating our element when we've scrolled it into view

  // end our animation when we've scrolled the offset specified

  const y = useTransform(scrollY, [totalHeight - 2000, totalHeight], [200, 0]);

  // console.log("initial", initial);
  // console.log("final", final);
  // console.log("totalHeight", totalHeight);

  useLayoutEffect(() => {
    const element = ref.current;
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      // use getBoundingClientRect instead of offsetTop in order to
      // get the offset relative to the viewport
      setElementTop(
        element?.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset
      );
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);
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
