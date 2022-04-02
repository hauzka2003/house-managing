import { useLayout } from "../../store/layout";
import styles from "./navigation.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import SettingsIcon from "../icons/setting";
import CloseaMailIcon from "../icons/close_mail";
import BellIcon from "../icons/bell";
import { useUser } from "../../store/user";
// import DarkIcon from "../icons/dark_icon";
import AvatarUser from "../icons/avatar";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import SearchIcon from "../icons/search";
import axios from "axios";
import SearchModal from "../search/search-modal";
import useOutside from "../hooks/click-outside";

const iconsStyle = {
  minWidth: "25px",
  minHeight: "25px",
  maxWidth: "25px",
  maxHeight: "25px",
  marginLeft: "20px",
  marginRight: "20px",
  cursor: "pointer",
};

function PageTitle() {
  const { navClosed, currentPage } = useLayout();
  const { displayName, user } = useUser();
  const router = useRouter();

  const format = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  const [userName, setUserName] = useState(displayName);
  const searchIconAnimate = useAnimation();
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [timeoutID, setTimeoutID] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const clickOutsideRef = useRef(null);

  useOutside(clickOutsideRef, setSearchModal);

  useEffect(() => {
    setUserName(displayName);
  }, [displayName]);

  useEffect(() => {
    if (searchInput.length <= 2) {
      setSearchModal(false);
    }
  }, [searchInput]);

  function onClicked(page) {
    router.push(page);
  }

  //make a search engine for the user to search for users
  function onSearch(e) {
    if (e.key === "Enter") {
      setSearchModal(true);
      setSearchInput(e.target.value);
    }
  }

  async function onSearch(e) {
    clearTimeout(timeoutID);

    format.test(e.target.value)
      ? (e.target.value = e.target.value.replace(format, ""))
      : null;

    setSearchInput(e.target.value);
    if (e.target.value.length <= 2) {
      return;
    }

    const timeOutID = setTimeout(async () => {
      await axios
        .get(`/api/search-user/${e.target.value}`)
        .then((res) => {
          setSearchResult(res.data.data);
          setSearchModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
    setTimeoutID(timeOutID);
  }

  async function onSearchAnimation() {
    setIsFocused(true);
    if (searchInput?.length > 0 && searchResult?.length >= 0) {
      setSearchModal(true);
    }

    await searchIconAnimate.start({
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    });
    await searchIconAnimate.start({
      rotate: 90,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 0.2,
      },
    });
    searchIconAnimate.start({
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 0.2,
      },
    });
  }

  async function onSearchAnimationEnd() {
    setIsFocused(false);
    await searchIconAnimate.start({
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    });
    await searchIconAnimate.start({
      rotate: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 0.2,
      },
    });
    searchIconAnimate.start({
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        delay: 0.2,
      },
    });
  }

  return (
    <motion.div
      className={styles.pagetitle}
      initial={
        navClosed
          ? { left: "120px", width: "calc(100vw - 120px)", y: -100 }
          : { left: "300px", width: "calc(100vw - 300px)", y: -100 }
      }
      animate={
        navClosed
          ? { left: "120px", width: "calc(100% - 120px)", y: 0 }
          : { left: "300px", width: "calc(100% - 300px)", y: 0 }
      }
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className={styles.title}
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {currentPage}
        </motion.div>
      </AnimatePresence>
      <motion.div className={styles.search_box} ref={clickOutsideRef}>
        <SearchIcon style={{ width: "25px" }} animate={searchIconAnimate} />
        <motion.input
          placeholder={
            isFocused
              ? "You can search for your friends here"
              : "Type in anything to search"
          }
          className={styles.input}
          onFocus={onSearchAnimation}
          onBlur={onSearchAnimationEnd}
          type="text"
          value={searchInput}
          onChange={onSearch}
        />
        <AnimatePresence exitBeforeEnter>
          {searchModal && (
            <SearchModal
              results={searchResult}
              key={"search-modal"}
              innerRef={clickOutsideRef}
              setSearchModal={setSearchModal}
              isNoResult={searchResult.length === 0}
              searchInput={searchInput}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <div className={styles.user}>
        <div className={styles.notification}>
          <CloseaMailIcon style={iconsStyle} />
          <BellIcon style={iconsStyle} />
        </div>

        {/* <DarkIcon /> */}
        <SettingsIcon
          style={iconsStyle}
          onClick={() => {
            onClicked("/dashboard/setting");
          }}
          whileHover={{ rotate: 180, transition: { duration: 1 }, scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <AvatarUser email={user?.email} />
          <span className={styles.userName}>{userName?.userName}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default PageTitle;
