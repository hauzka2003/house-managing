import { motion } from "framer-motion";
function ArrowUp({ style, animate, initial, exit }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      style={style}
      animate={animate}
      initial={initial}
    >
      <title>Arrow Up</title>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="48"
        d="M112 244l144-144 144 144M256 120v292"
      />
    </motion.svg>
  );
}

export default ArrowUp;
