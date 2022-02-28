import { motion, useAnimation } from "framer-motion";
function HomeIcon({
  style,
  initial,
  animate,
  exit,
  pathStyle,
  animation,
  hover,
  draw,
}) {
  const styles = {
    ...style,
    minWidth: "25px",
    minHeight: "25px",
    maxWidth: "25px",
    maxHeight: "25px",
  };
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      style={styles}
      animate={animation}
    >
      <title>Home</title>
      <motion.path
        d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
      />
      <motion.path
        d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        variants={draw}
        custom={0.1}
      />
    </motion.svg>
  );
}

export default HomeIcon;
