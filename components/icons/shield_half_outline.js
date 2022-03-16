import { motion } from "framer-motion";

function ShieldHalfIcon({ style, animate, initial, exit, draw, isloading }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      initial={initial}
      style={style}
      animate={animate}
      exit={exit}
    >
      <title>Shield Half</title>
      <motion.path
        d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
      />
      <motion.path
        d="M256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464z"
        fill={isloading ? "none" : ""}
        variants={draw}
      />
    </motion.svg>
  );
}

export default ShieldHalfIcon;
