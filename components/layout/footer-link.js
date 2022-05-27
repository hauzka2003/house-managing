import styles from "./footer.module.css";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";

function FooterLink({ href, name, currentDevice, left, right, totalHeight }) {
  const ref = useRef(null);
  const ref1 = useRef(null);

  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);

  const y = useTransform(scrollY, [totalHeight - 2000, totalHeight], [200, 0]);
  const spring = useSpring(totalHeight ? y : null, {
    stiffness: 200,
    damping: 50,
  });

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

  return (
    <div className={styles.footer_link_container} ref={ref1}>
      <motion.div
        className={styles.footer_link}
        ref={ref}
        style={{
          y: spring,
        }}
      >
        <Link
          href={href}
          scroll={currentDevice.currentDevice === "desktop" ? true : false}
        >
          {name}
        </Link>
      </motion.div>
      <div
        className={styles.footer_link}
        style={{
          right: `${ref1.current?.getBoundingClientRect().width - 50}px`,
          opacity: 0.7,
        }}
      >
        {left}
      </div>
      <div
        className={styles.footer_link}
        style={{
          left: `${ref1.current?.getBoundingClientRect().width - 50}px`,
          opacity: 0.7,
        }}
      >
        {right}
      </div>
      <div style={{ opacity: 0 }}>{name}</div>
    </div>
  );
}

export default FooterLink;
