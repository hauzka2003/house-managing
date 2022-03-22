import { motion } from "framer-motion";

function BusIcon({ style, animate, initial, exit }) {
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
      <title>Bus</title>
      <motion.rect
        x="80"
        y="112"
        width="352"
        height="192"
        rx="32"
        ry="32"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <motion.rect
        x="80"
        y="304"
        width="352"
        height="128"
        rx="32"
        ry="32"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <motion.path
        d="M400 112H112a32.09 32.09 0 01-32-32h0a32.09 32.09 0 0132-32h288a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32zM144 432v22a10 10 0 01-10 10h-28a10 10 0 01-10-10v-22zM416 432v22a10 10 0 01-10 10h-28a10 10 0 01-10-10v-22z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <motion.circle
        cx="368"
        cy="368"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <motion.circle
        cx="144"
        cy="368"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M256 112v192M80 80v288M432 80v288"
      />
    </motion.svg>
  );
}

export default BusIcon;
