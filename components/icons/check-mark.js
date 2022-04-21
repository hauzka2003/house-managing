import { motion } from "framer-motion";

function CheckMarkIcon({ style, animate, draw }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      animate={animate}
    >
      <title>Accept</title>
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M416 128L192 384l-96-96"
        variants={draw}
      />
    </motion.svg>
  );
}

export default CheckMarkIcon;
