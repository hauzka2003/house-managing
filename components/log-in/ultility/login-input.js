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

export default function StoreInput() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  return {
    state,
    dispatch,
  };
}

export async function LogIn(userName, password, signIn) {
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

export async function SignUp(state) {
  if (!state.email.includes("@")) {
    return { message: "Email is not valid", type: "error" };
  }

  if (state.signUpPass.length <= 6 || state.signUpPass.trim() === "") {
    return { message: "Password must be at least 7 characters", type: "error" };
  }

  if (state.signUpPass !== state.confirmPass) {
    return { message: "Confirm password is not match", type: "error" };
  }
  const res = await fetch(`/api/sign-up/user_name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: state.signUpUN }),
  });
  const data = await res.json();
  if (data.localStatus === 1) {
    return { message: "Username existed", type: "error" };
  }

  const data1 = {
    email: state.email,
    password: state.signUpPass,
    userName: state.signUpUN,
  };
  const res1 = await fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data1),
  });

  if (res1.status === 400) {
    return { message: "Something went wrong with us", type: "error" };
  }

  const fetchedData = await res1.json();
  if (fetchedData.localStatus === 5) {
    return { message: "Email existed", type: "error" };
  }

  return { message: "Sign up successfully", type: "success" };
}
