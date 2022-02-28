import { motion } from "framer-motion";

function ArrowUpIcon({ style, animate, initial, exit }) {
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
      <title>Chevron Up</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLineJoin="round"
        strokeWidth="48"
        d="M112 328l144-144 144 144"
      />
    </motion.svg>
  );
}

export default ArrowUpIcon;
