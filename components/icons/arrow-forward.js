import { motion } from "framer-motion";

function ArrowForwardIcon({ style, animate, initial, exit }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      <title>Arrow Forward</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M268 112l144 144-144 144M392 256H100"
      />
    </motion.svg>
  );
}

export default ArrowForwardIcon;
