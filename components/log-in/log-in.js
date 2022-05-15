import styles from "./log-in.module.css";
import { useState, useReducer } from "react";
import { motion } from "framer-motion";
import StoreInput from "./ultility/login-input";

import { useRouter } from "next/router";
import { useUser } from "../../store/user";
import { useErrorModal } from "../../store/error_modal";
import { useLayout } from "../../store/layout";

function frontUserCheck(userName, password) {
  if (
    userName.trim() === "" ||
    password.trim() === "" ||
    userName.length <= 6
  ) {
    return false;
  }
  return true;
}

function LogIn(props) {
  const router = useRouter();
  const { signIn } = useUser();
  const [moved, toggle] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState("");
  const [UNMatch, setUNMatch] = useState(false);
  const { setError } = useErrorModal();
  props.onMoved(moved);

  const { dispatch, state } = StoreInput();

  const { userName, password, email, signUpUN, signUpPass, confirmPass } =
    state;

  const { setInforModal } = useLayout();

  async function signInHandler(e) {
    setError({ message: "wait for us to sign you in", type: "info" });
    e.preventDefault();
    if (!frontUserCheck(userName, password)) {
      setError({ message: "Please fill in all fields", type: "error" });
      return;
    }
    let data;
    if (!userName.includes("@")) {
      const responses = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      });
      data = await responses.json();
      if (
        data.localStatus == 1 ||
        data.localStatus == 3 ||
        data.localStatus == 4
      ) {
        setError({ message: "Wrong username or password", type: "error" });
        return;
      }
    }
    const user = await signIn(data?.email ?? userName, password);
    if (user?.status === 400) {
      setError({ message: "Incorrect email or password", type: "error" });
      return;
    }
    if (user) {
      setError(null);
      router.push("/dashboard");
    }
  }
  async function checkUserName(userName, onBlur) {
    if (onBlur) {
      if (userName === enteredUserName) {
        return;
      }
      setEnteredUserName(userName);
    }
    if (userName.length <= 6 || userName.trim() === "") {
      setError({
        message: "Username must be at least 7 characters",
        type: "error",
      });
      return false;
    }
    const res = await fetch(`/api/sign-up/user_name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName }),
    });
    const data = await res.json();
    if (data.localStatus === 1) {
      setError({ message: "Username existed", type: "error" });
      return false;
    }
    return true;
  }
  async function signUnpHandler(e) {
    e.preventDefault();
    setError({ message: "Waiting for server response", type: "info" });
    if (!(await checkUserName(signUpUN))) {
      console.log("username not available");
      return;
    }
    if (signUpPass !== confirmPass) {
      setError({ message: "Password is not matched", type: "error" });
      return;
    }
    const data = { email, password: signUpPass, userName: signUpUN };
    const res = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 400) {
      setError({ message: "Something went wrong with us", type: "error" });
      return;
    }
    const fetchedData = await res.json();
    console.log("fetchedData: ", fetchedData);
    if (fetchedData.localStatus === 5) {
      setError({ message: "Email existed", type: "error" });
      return;
    }
    setError({
      message: "Sign up successfully. Please check your email",
      type: "success",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.smallcontainer}>
        <div className={`${styles.signin} ${styles.box}`}>
          <h2>Already have an account?</h2>
          <div
            className={styles.signinbtn}
            onClick={() => {
              toggle(!moved);
            }}
          >
            Sign in
          </div>
        </div>
        <div className={`${styles.signup} ${styles.box}`}>
          <h2>Don&lsquo;t have an account?</h2>
          <div
            className={`${styles.signinbtn}`}
            onClick={() => {
              toggle(!moved);
            }}
          >
            Sign up
          </div>
        </div>
      </div>
      <motion.div
        className={`${styles.formbox}`}
        animate={moved ? { left: "50%" } : { left: 0 }}
      >
        <motion.div
          className={`${styles.form} ${styles.signinform}`}
          animate={
            moved ? { left: "-100%" } : { left: 0, transition: { delay: 0.25 } }
          }
        >
          <form onSubmit={signInHandler}>
            <h3>Sign In</h3>
            <input
              type="text"
              placeholder="Username or Email"
              className={styles.input}
              onChange={(e) => {
                dispatch({ type: "userName", value: e.target.value });
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={(e) => {
                dispatch({ type: "password", value: e.target.value });
              }}
              required
            />
            <input type="submit" value="Login" className={styles.loginbtn} />
            <div
              style={{ color: "#333", cursor: "pointer" }}
              onClick={() => {
                setInforModal(true);
              }}
            >
              Forget Password?
            </div>
          </form>
        </motion.div>
        <motion.div
          className={`${styles.form} ${styles.signupform}`}
          initial={{ left: "100%" }}
          animate={
            !moved ? { left: "100%" } : { left: 0, transition: { delay: 0.25 } }
          }
        >
          <form onSubmit={signUnpHandler}>
            <h3>Sign Up</h3>
            <input
              onBlur={() => checkUserName(signUpUN, "onBlur")}
              type="text"
              placeholder="Username"
              className={styles.input}
              onChange={(e) => {
                dispatch({ type: "signUpUserName", value: e.target.value });
              }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              required
              onChange={(e) => {
                dispatch({ type: "email", value: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={(e) => {
                dispatch({ type: "signUpPass", value: e.target.value });
              }}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              required
              onChange={(e) => {
                dispatch({ type: "confirmPass", value: e.target.value });
              }}
            />
            <input
              type="submit"
              value="Register"
              className={styles.loginbtn}
              style={{ backgroundColor: "#f43648" }}
            />
            <div
              onClick={() => {
                setInforModal(true);
              }}
              style={{ color: "#333", cursor: "pointer" }}
            >
              Forget Password?
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LogIn;
