import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./link.module.css";
const variants = {
  hidden: {
    width: 0,
  },
  show: {
    width: "100%",
    transition: { type: "ease-in-out" },
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    width: 0,
    left: "100%",
    transition: {
      duration: 0.5,
    },
  },
};
function BetterLink({
  to,
  children,
  style,
  type,
  whileTap,
  onClick,
  underlined,
  onHoverStart,
  onHoverEnd,
  hovered,
}) {
  const styles = { ...style, cursor: "pointer" };
  return (
    <Link href={to}>
      <motion.a
        style={styles}
        className={type === "nav" && classes.link}
        // whileHover={whileHover ?? {}}
        whileTap={whileTap ?? {}}
        onClick={onClick}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      >
        {children}
        {underlined && (
          <motion.div className={classes.underline1} layoutId="navlink" />
        )}
        <AnimatePresence>
          {!underlined && hovered && (
            <motion.div
              key="modal"
              variants={variants}
              className={classes.underline}
              initial="hidden"
              animate="show"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </motion.a>
    </Link>
  );
}
export default BetterLink;
