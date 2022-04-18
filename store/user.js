import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import axios from "axios";
import Router from "next/router";
const userContext = createContext();
const PING_RESOURCE = "/api/test-ping";
const TIMEOUT_TIME_MS = 3000;
const onlinePollingInterval = 10000;

function timeout(time, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"));
    }, time);
    promise.then(resolve, reject);
  });
}

async function CheckOnlineStatus() {
  const controller = new AbortController();
  const { signal } = controller;

  if (!navigator.onLine) {
    return navigator.onLine;
  }
  try {
    await timeout(
      TIMEOUT_TIME_MS,
      fetch(PING_RESOURCE, { method: "GET", signal })
    );
    return true;
  } catch (e) {
    console.log(e);
    controller.abort();
  }
  return false;
}

async function updateLastSeen() {
  await axios.post("/api/user/last-seen").catch((err) => {
    console.log(err);
    // Router.reload();
  });
}

export function UserContextProvider({ children }) {
  const currentUser = supabase.auth.user();
  const [user, setUser] = useState(currentUser);
  const [displayName, setDisplayName] = useState({
    userName: currentUser?.user_metadata?.userName,
    signature: currentUser?.user_metadata?.signature,
    lastName: currentUser?.user_metadata?.lastName,
    firstName: currentUser?.user_metadata?.firstName,
    phone: currentUser?.user_metadata?.phone,
  });
  const [initialUpdate, setInitialUpdate] = useState(true);
  const [online, setOnline] = useState(true);

  const router = useRouter();

  async function checkStatus() {
    const onlineStatus = await CheckOnlineStatus();
    setOnline(onlineStatus);
  }

  async function signIn(email, password) {
    const { user, error, session } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      return error;
    }
    return user;
  }

  useEffect(() => {
    async function getUserProfile(user) {
      // const sessionUser = supabase.auth.user();
      if (user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();
        return setUser({ ...user, ...profile });
      }
    }

    getUserProfile();
    const { data: unsubscribe } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        console.log("session", session);
        if (event === "SIGNED_OUT") {
          return setUser(null);
        }
        if (event === "USER_UPDATED") {
          setDisplayName({
            userName: session?.user?.user_metadata?.userName,
            signature: session?.user?.user_metadata?.signature,
            lastName: session?.user?.user_metadata?.lastName,
            firstName: session?.user?.user_metadata?.firstName,
            phone: session?.user?.user_metadata?.phone,
          });
          return;
        }
        if (session) {
          setDisplayName({
            userName: session?.user?.user_metadata?.userName,
            signature: session?.user?.user_metadata?.signature,
            lastName: session?.user?.user_metadata?.lastName,
            firstName: session?.user?.user_metadata?.firstName,
            phone: session?.user?.user_metadata?.phone,
          });
          getUserProfile(session?.user);
        }
      }
    );

    let checkStatusId;
    window.addEventListener("offline", setOnline(false));
    checkStatusId = setInterval(checkStatus, onlinePollingInterval);
    return () => {
      window.removeEventListener("offline", setOnline(false));
      clearInterval(checkStatusId);
    };
  }, []);

  useEffect(() => {
    async function setCookie() {
      const res = await fetch("/api/set-supabase-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: user ? "SIGNED_IN" : "SIGNED_OUT",
          session: supabase.auth.session(),
        }),
      });
      if (user && initialUpdate && res && online) {
        await updateLastSeen();
        setInitialUpdate(false);
      }
    }

    setCookie();

    let lastSeenId;

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        clearInterval(lastSeenId);
        setInitialUpdate(true);
      }
    });

    if (user) {
      lastSeenId = setInterval(() => {
        updateLastSeen();
      }, 10000);
    }

    if (!user) {
      clearInterval(lastSeenId);
    }
  }, [user]);

  async function signUp(email, password) {
    const newUser = { email, password };
    const response = await fetch("/api/sign-up/", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    if (response.status !== 200) {
      const data = await response.json();
      return data;
    }

    const { user } = await response.json();
    setUser(user);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/log-in");
  }

  const content = {
    signIn: signIn,
    signUp: signUp,
    user: user,
    signOut,
    displayName,
    setDisplayName,
  };

  return (
    <userContext.Provider value={content}>{children}</userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }

  return context;
}
export default userContext;
