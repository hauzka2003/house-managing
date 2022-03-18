import { motion } from "framer-motion";
function ErrorIcon({ style, animate, initial, exit, onTap, draw }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      initial={initial}
      animate={animate}
      exit={exit}
      onTap={onTap}
    >
      <title>Close Circle</title>
      <motion.path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        variants={draw}
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M320 320L192 192M192 320l128-128"
        variants={draw}
        custom={0.5}
      />
    </motion.svg>
  );
}

export default ErrorIcon;
