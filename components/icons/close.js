import { motion } from "framer-motion";

function CloseIcon({ style, animate, draw }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={style}
      animate={animate}
    >
      <title>Decline</title>
      <motion.path
        d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
        variants={draw}
      />
    </motion.svg>
  );
}

export default CloseIcon;
