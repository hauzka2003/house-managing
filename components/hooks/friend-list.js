import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../../store/user";
import { supabase } from "../../utils/supabase";

const UseFriendContext = createContext();

export function UseFriendProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let mySubscription = null;

  const { user } = useUser();

  const getFriends = async () => {
    try {
      const { data } = await supabase
        .from("social")
        .select("friends")
        .eq("id", user.id)
        .single();

      setFriends([...data?.friends]);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!user) {
      supabase.removeSubscription(mySubscription);
      mySubscription = null;
    }

    if (user && !mySubscription) {
      getFriends();

      mySubscription = supabase
        .from(`social:id=eq.${user.id}`)
        .on("UPDATE", (payload) => {
          setFriends(payload?.new?.friends);
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(mySubscription);
      };
    }
  }, [user]);

  return (
    <UseFriendContext.Provider value={{ friends, loading, error }}>
      {children}
    </UseFriendContext.Provider>
  );
}

export function useFriendList() {
  const context = useContext(UseFriendContext);
  if (!context) {
    throw new Error("useFriendList must be used within a UseFriendProvider");
  }
  return context;
}
