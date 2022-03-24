import classes from "./hometown-header.module.css";
import { AnimatePresence, motion } from "framer-motion";

const initialContent = [
  {
    content:
      "A mega city that is known for its richness in traditions, cuisines and cultures from as early as the late 18th century.",
  },
  {
    content:
      "Although the city official name is Ho Chi Minh, many people including the natives still refer the city as the name Sai Gon.",
  },
];

const backgroundContent = [
  {
    content:
      "The city has seen kingdoms and countries from distant contients conquered and established capital throughout as short as 400 hundreds years.",
  },
  {
    content:
      "After the fall of Sai Gon in 1975, the city was renamed as Ho Chi Minh to glorify the name of the leader.",
  },
];

const destinationsContent = [
  {
    content:
      "Despite heavily bombarded in the recent war, the city is still a major tourist destination in the world.",
  },
  {
    content:
      "Many foreign tourists visit VietNam out of curiosities because of the well known VietNam war that USSR and US released tensions on.",
  },
];

const cuisinesContent = [
  {
    content:
      "Famous for its variety of cuisines that come from across the country and the world.",
  },
  {
    content:
      "The city cuisine start to get influenced by the Western world. However, many more peculiar yet tasty food are discovered every year.",
  },
];

const culturesContent = [
  {
    content:
      "The city cultures are slightly resemble the customs of the surrounding countries like Combodia or Thailand because of the long history.",
  },
  {
    content:
      "After the unification, the city became a major cultural center with the combination of North and South.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function SideContent({ isHover }) {
  return (
    <motion.div
      className={classes.side_content}
      whileHover={{ scale: 1.05 }}
      initial="hidden"
      variants={container}
      animate="show"
    >
      <AnimatePresence exitBeforeEnter>
        {isHover === null && (
          <motion.div
            className={classes.side_content_title}
            variants={item}
            exit={{ opacity: 0 }}
            key="main"
          >
            Welcome to Ho Chi Minh city
          </motion.div>
        )}
        {isHover === "destinations" && (
          <motion.div
            className={classes.side_content_title}
            variants={item}
            exit={{ opacity: 0 }}
            key="destinations"
          >
            Appealing tourist spots
          </motion.div>
        )}
        {isHover === "background" && (
          <motion.div
            className={classes.side_content_title}
            variants={item}
            exit={{ opacity: 0 }}
            key="background"
          >
            The unwavering history
          </motion.div>
        )}
        {isHover === "cuisines" && (
          <motion.div
            className={classes.side_content_title}
            variants={item}
            key="cuisines"
            exit={{ opacity: 0 }}
          >
            Delectable cuisines
          </motion.div>
        )}
        {isHover === "cultures" && (
          <motion.div
            className={classes.side_content_title}
            variants={item}
            exit={{ opacity: 0 }}
            key="cultures"
          >
            diverse customs
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={classes.side_content_content}
        initial="hidden"
        variants={container}
        animate="show"
      >
        <AnimatePresence exitBeforeEnter>
          {isHover === null &&
            initialContent.map((content) => {
              return (
                <motion.div
                  className={classes.side_content_content_item}
                  variants={item}
                  exit={{ opacity: 0 }}
                  key={content.content}
                >
                  {content.content}
                </motion.div>
              );
            })}
          {isHover === "background" &&
            backgroundContent.map((content) => {
              return (
                <motion.div
                  className={classes.side_content_content_item}
                  variants={item}
                  key={content.content}
                  exit={{ opacity: 0 }}
                >
                  {content.content}
                </motion.div>
              );
            })}
          {isHover === "destinations" &&
            destinationsContent.map((content) => {
              return (
                <motion.div
                  className={classes.side_content_content_item}
                  variants={item}
                  key={content.content}
                  exit={{ opacity: 0 }}
                >
                  {content.content}
                </motion.div>
              );
            })}
          {isHover === "cuisines" &&
            cuisinesContent.map((content) => {
              return (
                <motion.div
                  className={classes.side_content_content_item}
                  variants={item}
                  key={content.content}
                  exit={{ opacity: 0 }}
                >
                  {content.content}
                </motion.div>
              );
            })}
          {isHover === "cultures" &&
            culturesContent.map((content) => {
              return (
                <motion.div
                  className={classes.side_content_content_item}
                  variants={item}
                  key={content.content}
                  exit={{ opacity: 0 }}
                >
                  {content.content}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default SideContent;
