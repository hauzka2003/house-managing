import { motion } from "framer-motion";

function CultureIcon({ style, animate, initial, exit }) {
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
      <title>Golf</title>
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M256 400V32l176 80-176 80"
      />
      <motion.path
        d="M256 336c-87 0-175.3 43.2-191.64 124.74C62.39 470.57 68.57 480 80 480h352c11.44 0 17.62-9.43 15.65-19.26C431.3 379.2 343 336 256 336z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
    </motion.svg>
  );
}

export default CultureIcon;
