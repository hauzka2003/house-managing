import { motion } from "framer-motion";

function BulbIcon({ style, animation, draw }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      animate={animation}
    >
      <title>Bulb</title>
      <motion.path
        d="M304 384v-24c0-29 31.54-56.43 52-76 28.84-27.57 44-64.61 44-108 0-80-63.73-144-144-144a143.6 143.6 0 00-144 144c0 41.84 15.81 81.39 44 108 20.35 19.21 52 46.7 52 76v24M224 480h64M208 432h96M256 384V256"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
      />
      <motion.path
        d="M294 240s-21.51 16-38 16-38-16-38-16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.5}
      />
    </motion.svg>
  );
}

export default BulbIcon;
