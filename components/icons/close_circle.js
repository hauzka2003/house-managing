import { motion } from "framer-motion";
function CloseCircleIcon({ style, animate, initial, exit, onTap }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      style={style}
      initial="hidden"
      animate="visible"
      exit={exit}
      onTap={onTap}
    >
      <title>Close Circle</title>
      <motion.path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
        variants={draw}
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M320 320L192 192M192 320l128-128"
        variants={draw}
        custom={0.5}
      />
    </motion.svg>
  );
}

export default CloseCircleIcon;
