import { motion } from "framer-motion";

function SocialIcon({ style, animation, draw, onClick, whileHover, whileTap }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      initial={{ originX: "50%", originY: "50%" }}
      animate={animation}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      <title>Social</title>
      <motion.circle
        cx="128"
        cy="256"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.1}
      />
      <motion.circle
        cx="384"
        cy="112"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.1}
      />
      <motion.circle
        cx="384"
        cy="400"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.1}
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94"
        variants={draw}
      />
    </motion.svg>
  );
}

export default SocialIcon;
