import styles from "./search-modal.module.css";
import { motion } from "framer-motion";
import MiniProfile from "./mini-profile";

function SearchModal({
  results,
  innerRef,
  setSearchModal,
  isNoResult,
  searchInput,
}) {
  return (
    <motion.div
      className={styles.overflow_container}
      key={"overflow_container"}
    >
      <motion.div
        className={styles.container}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        ref={innerRef}
      >
        {isNoResult && (
          <motion.div
            className={styles.no_result}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={"no-result"}
          >{`No result for "${searchInput}"`}</motion.div>
        )}
        {results?.map((item) => {
          return (
            <MiniProfile
              email={item?.email}
              username={item?.username}
              key={item?.email}
              setSearchModal={setSearchModal}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default SearchModal;
