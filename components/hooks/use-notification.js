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
        .from("friendRequest")
        .select("*")
        .eq("receiver", user?.id);

      setNotifications([...data]);
    }

    if (user) {
      getNotifications();

      const friendRequestScription = supabase
        .from(`friendRequest:receiver=eq.${user.id}`)
        .on("INSERT", (payload) => {
          setNotifications((notifications) => [...notifications, payload?.new]);
        })
        .subscribe();
      return () => {
        supabase.removeSubscription(friendRequestScription);
      };
    }
  }, [user]);

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
