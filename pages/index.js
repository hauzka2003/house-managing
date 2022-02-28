import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout/layout";
import styles from "../styles/Home.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
export default function Home() {
  const [isShown, setShown] = useState(false);
  const animation = useAnimation();
  async function sequence() {
    await animation.start({ rotate: -90 });
    await animation.start({ scale: 1.5 });
    await animation.start({ rotate: 0 });
    animation.start({ scale: 1 });
  }
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          setShown(!isShown);
        }}
      >
        click
      </div>
      <div>
        <motion.div
          style={{
            width: 150,
            height: 150,
            borderRadius: 30,
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          onTap={sequence}
          animate={animation}
        />
      </div>
      <AnimatePresence>
        {isShown && (
          <motion.div
            key="ngu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ngu
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
