import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../../utils/supabase";

const UseNotificationContext = createContext();

export function UseNotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  console.log(notifications);

  useEffect(() => {
    async function getNotifications() {
      const { data } = await supabase
        .from("friend_request")
        .select("*")
        .eq("receiver", user?.id);

      setNotifications(data);
    }

    if (user) {
      getNotifications();

      //   const friendRequestScription = supabase
      //     .from(`friend_request:receiver=eq.${user?.id}`)
      //     .on("INSERT", (payload) => {
      //       console.log("INSERT", payload);

      //       setNotifications((notifications) => [...notifications, payload?.new]);
      //     })
      //     .subscribe();
      //   return () => {
      //     supabase.removeSubscription(friendRequestScription);
      //   };
    }
  }, [user]);

  useEffect(() => {
    // const friendRequestScription = supabase
    //   .from(`friend_request:receiver=eq.9895ab43-d653-4d51-bb3a-d44ba8725fb3`)
    //   .on("*", (payload) => {
    //     console.log("INSERT", payload?.new);
    //     setNotifications((notifications) => [...notifications, payload?.new]);
    //   })
    //   .subscribe();
    // return () => {
    //   supabase.removeSubscription(friendRequestScription);
    // };
    const lastSeenRealTime = supabase
      .from(`friend_request:receiver=eq.9895ab43-d653-4d51-bb3a-d44ba8725fb3`)
      .on("*", (payload) => {
        console.log("hello", payload?.new);
        if (payload) {
          console.log("payload", payload);
          return;
        }
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(lastSeenRealTime);
    };
  }, []);

  return (
    <UseNotificationContext.Provider
      value={{ notifications, setNotifications, setUser }}
    >
      {children}
    </UseNotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(UseNotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a UseNotificationProvider"
    );
  }
  return context;
}
