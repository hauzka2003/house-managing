import styles from "./log-in.module.css";
import { useState, useReducer } from "react";
import { motion } from "framer-motion";
import BetterLink from "../link/better-link";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import { useUser } from "../../store/user";
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
  const [isMatched, setIsMatched] = useState();
  props.onMoved(moved);
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { userName, password, email, signUpUN, signUpPass, confirmPass } =
    state;
  async function signInHandler(e) {
    e.preventDefault();
    // const { user } = supabase.auth.signIn({
    //   email: userName,
    //   password: password,
    // });
    // if (user) {
    //   router.push({ pathname: "/dashboard" });
    // }
    const user = await signIn(userName, password);
    console.log("user: ", user);
    if (user) {
      router.push("/dashboard");
    }
  }
  async function signUnpHandler(e) {
    e.preventDefault();
    if (signUpPass !== confirmPass) {
      console.log("ngu");
      setIsMatched(false);
    }
    const data = { email, password: signUpPass, userName: signUpUN };
    console.log(data);
    const res = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const fetchedData = await res.json();
    console.log(fetchedData);
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
              placeholder="Username"
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
