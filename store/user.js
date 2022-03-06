import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const userContext = createContext();

export function UserContextProvider({ children }) {
  const currentUser = supabase.auth.user();
  const [user, setUser] = useState(currentUser);
  const [displayName, setDisplayName] = useState(
    currentUser?.user_metadata?.userName
  );

  console.log("displayName", displayName);

  const router = useRouter();

  console.log("user in context: ", user);

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
        if (event === "SIGNED_OUT") {
          return setUser(null);
        }
        if (event === "USER_UPDATED") {
          setDisplayName(session.user?.user_metadata?.userName);
          return;
        }
        setDisplayName(session?.user?.user_metadata?.userName);
        getUserProfile(session?.user);
      }
    );
  }, []);

  useEffect(() => {
    fetch("/api/set-supabase-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: user ? "SIGNED_IN" : "SIGNED_OUT",
        session: supabase.auth.session(),
      }),
    });
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
