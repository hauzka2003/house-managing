import { motion } from "framer-motion";

function LockClosedIcon({ style, onClick, clicked }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      onClick={onClick}
    >
      <title>Lock Open</title>
      <motion.path
        d={
          clicked
            ? "M336 112a80 80 0 00-160 0v96"
            : "M336 208v-95a80 80 0 00-160 0v95"
        }
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <motion.rect
        x="96"
        y="208"
        width="320"
        height="272"
        rx="48"
        ry="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </motion.svg>
  );
}

export default LockClosedIcon;
