import { useReducer } from "react";

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

function frontUserCheck(userName, password, Login) {
  if (
    userName.trim() === "" ||
    password.trim() === "" ||
    userName.length <= 6
  ) {
    return false;
  }
  return true;
}

export default function StoreInput() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  return {
    state,
    dispatch,
  };
}

export async function LogIn(userName, password, signIn) {
  if (!frontUserCheck(userName, password)) {
    return { message: "Please fill in all fields", type: "error" };
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
      return { message: "Wrong username or password", type: "error" };
    }
  }
  let user;

  if (signIn) {
    user = await signIn(data?.email ?? userName, password);
    if (user?.status === 400) {
      return { message: "Incorrect email or password", type: "error" };
    }
    if (user) {
      return { message: "Sign in successfully", type: "success" };
    }
  } else {
    return { message: "Internal error", type: "error" };
  }
}
