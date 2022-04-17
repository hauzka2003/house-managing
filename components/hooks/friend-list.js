import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../../store/user";
import { supabase } from "../../utils/supabase";

const UseFriendContext = createContext();

export function UseFriendProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log("friends", friends);

  let mySubscription = null;

  const { user } = useUser();

  async function cancelFriend(friendID) {
    try {
      await axios.post(`/api/request/cancel-friend/`, {
        friendID,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  const getFriends = async () => {
    try {
      const { data, error } = await supabase
        .from("friends")
        .select("friendID")
        .eq("userID", user.id);

      if (error) {
        console.log("error", error);
      }

      setFriends(data?.map((friend) => friend.friendID));
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
        .from(`friends:userID=eq.${user.id}`)
        .on("INSERT", (payload) => {
          console.log("INSERT", payload?.new);

          setFriends([...friends, payload?.new?.friendID]);
        })
        .on("DELETE", (payload) => {
          console.log("DELETE", payload?.old);
          setFriends(
            friends.filter((friend) => friend === payload?.old?.friendID)
          );
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(mySubscription);
      };
    }
  }, [user]);

  return (
    <UseFriendContext.Provider
      value={{ friends, loading, error, cancelFriend }}
    >
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
