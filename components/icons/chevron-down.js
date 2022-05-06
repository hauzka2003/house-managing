import { motion } from "framer-motion";

function ChervonDownIcon({ style, animate, onClick }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      animate={animate}
      style={style}
      onClick={onClick}
    >
      <title>down</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M112 184l144 144 144-144"
      />
    </motion.svg>
  );
}

export default ChervonDownIcon;
