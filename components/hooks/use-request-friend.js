import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../../store/user";
import { supabase } from "../../utils/supabase";

const useRequestFriendContext = createContext();

export function RequestFriendProvider({ children }) {
  const { user } = useUser();
  const [requestFriend, setRequestFriend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let realtimeSubscription = null;

  console.log("requestFriend", requestFriend);

  async function getFriendRequest() {
    try {
      const { data } = await supabase
        .from("friendRequest")
        .select("*")
        .eq("sender", user.id);

      setRequestFriend(data);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      setRequestFriend([]);
    }

    if (user && !realtimeSubscription) {
      getFriendRequest();

      realtimeSubscription = supabase
        .from(`friendRequest:sender=eq.${user.id}`)
        .on("INSERT", (payload) => {
          setRequestFriend([...requestFriend, payload?.new]);
        })
        .on("DELETE", (payload) => {
          setRequestFriend(
            requestFriend.filter((item) => item.id !== payload?.old?.id)
          );
        })
        .subscribe();
    }
  }, [user]);
  return (
    <useRequestFriendContext.Provider
      value={{
        requestFriend,
        loading,
        error,
      }}
    >
      {children}
    </useRequestFriendContext.Provider>
  );
}

export function useRequestFriend() {
  const context = useContext(useRequestFriendContext);
  if (!context) {
    throw new Error(
      "useRequestFriend must be used within a RequestFriendProvider"
    );
  }
  return context;
}
