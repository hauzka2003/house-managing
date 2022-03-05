import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
const userContext = createContext();

export function UserContextProvider({ children }) {
  const currentUser = supabase.auth.user();
  const [user, setUser] = useState(currentUser);
  const [session, setSession] = useState();

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
    async function getUserProfile() {
      if (currentUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();
        setUser({ ...user, ...profile });
      }
    }
    // const session = supabase.auth.session();
    // setSession(session);
    // setUser(session?.user ?? null);
    getUserProfile();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (!session) {
          setUser(null);
        } else {
          getUserProfile();
          setUser((pre) => {
            return { ...pre, ...session?.user };
          });
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
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

  const content = {
    signIn: signIn,
    signUp: signUp,
    user: user,
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
