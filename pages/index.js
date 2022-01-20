import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout/layout";
import styles from "../styles/Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
export default function Home() {
  const [isShown, setShown] = useState(false);
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          setShown(!isShown);
        }}
      >
        click
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
