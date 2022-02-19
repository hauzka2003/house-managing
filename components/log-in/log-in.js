import styles from "./log-in.module.css";
import { useState, useReducer } from "react";
import { motion } from "framer-motion";
import BetterLink from "../link/better-link";
import { useRouter } from "next/router";
import { useUser } from "../../store/user";
import { useErrorModal } from "../../store/error_modal";

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
function loginReducer(state, action) {
  switch (action.type) {
    case "userName": {
      return {
        ...state,
        userName: action.value,
      };
    }
    case "password": {
      return {
        ...state,
        password: action.value,
      };
    }
    case "signUpUserName": {
      return {
        ...state,
        signUpUN: action.value,
      };
    }
    case "email": {
      return {
        ...state,
        email: action.value,
      };
    }
    case "signUpPass": {
      return {
        ...state,
        signUpPass: action.value,
      };
    }
    case "confirmPass": {
      return {
        ...state,
        confirmPass: action.value,
      };
    }
  }
}
const initialState = {
  userName: "",
  password: "",
  email: "",
  signUpUN: "",
  signUpPass: "",
  confirmPass: "",
};
function LogIn(props) {
  const router = useRouter();
  const { signIn } = useUser();
  const [moved, toggle] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState("");
  const [UNMatch, setUNMatch] = useState(false);
  const { setError } = useErrorModal();
  props.onMoved(moved);
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { userName, password, email, signUpUN, signUpPass, confirmPass } =
    state;

  async function signInHandler(e) {
    e.preventDefault();
    if (!frontUserCheck(userName, password)) {
      setError("Please fill in all fields");
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
        setError("Wrong username or password");
        return;
      }
    }
    const user = await signIn(data?.email ?? userName, password);
    if (user?.status === 400) {
      setError("Incorrect email or password");
      return;
    }
    console.log("user: ", user);
    if (user) {
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
      setError("Username must be at least 7 characters");
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
      setError("Username existed");
      return false;
    }
    return true;
  }
  async function signUnpHandler(e) {
    e.preventDefault();
    setError("Waiting for server response");
    if (!(await checkUserName(signUpUN))) {
      console.log("username not available");
      return;
    }
    if (signUpPass !== confirmPass) {
      setError("Password is not matched");
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
    const fetchedData = await res.json();
    console.log("fetchedData: ", fetchedData);
    if (fetchedData.localStatus === 3) {
      setError("Email existed");
      return;
    }
    setError("Sign up successfully");
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
          <h2>Don't have an account?</h2>
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
            <BetterLink to={"/"} style={{ color: "#333" }}>
              Forget Password?
            </BetterLink>
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
            <BetterLink to={"/"} style={{ color: "#333" }}>
              Forget Password?
            </BetterLink>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LogIn;
