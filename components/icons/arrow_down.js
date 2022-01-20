import { motion } from "framer-motion";

function ArrowDownIcon({ style, animate, initial, exit }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      style={style}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      <title>Chevron Down</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLineJoin="round"
        strokeWidth="48"
        d="M112 184l144 144 144-144"
      />
    </motion.svg>
  );
}

export default ArrowDownIcon;
