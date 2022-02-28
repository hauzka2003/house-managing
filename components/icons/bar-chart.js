import { motion } from "framer-motion";
function BarChartIcon({ style, animation, draw }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      animate={animation}
    >
      <title>Bar Chart</title>
      <motion.path
        d="M32 32v432a16 16 0 0016 16h432"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
      />
      <motion.rect
        x="96"
        y="224"
        width="80"
        height="192"
        rx="20"
        ry="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.1}
      />
      <motion.rect
        x="240"
        y="176"
        width="80"
        height="240"
        rx="20"
        ry="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.2}
      />
      <motion.rect
        x="383.64"
        y="112"
        width="80"
        height="304"
        rx="20"
        ry="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.3}
      />
    </motion.svg>
  );
}

export default BarChartIcon;
