import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../../store/user";
import { supabase } from "../../utils/supabase";

const UseNotificationContext = createContext();

export function UseNotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState();
  let mySubscription = null;

  const { user } = useUser();

  console.log("notifications", notifications);

  async function acceptFriendRequest(request) {
    if (!request) return;

    await axios
      .post(`/api/request/accept-friend`, {
        receiver: request.receiver,
        sender: request.sender,
        id: request.id,
      })
      .then((response) => {
        console.log("response.data", response);

        if (response.status === 200) {
          setNotifications(
            notifications.filter(
              (notification) => notification.id !== request.id
            )
          );
          setLoading({ text: "Cancel friend", type: "friend" });
        }
      })
      .catch((err) => console.log(err));
  }

  // console.log(notifications);

  useEffect(() => {
    async function getNotifications() {
      const { data } = await supabase
        .from("friendRequest")
        .select("*")
        .eq("receiver", user?.id);

      setNotifications([...data]);
    }

    if (!user) {
      supabase.removeSubscription(mySubscription);
      mySubscription = null;
    }

    if (user && !mySubscription) {
      getNotifications();

      mySubscription = supabase
        .from(`friendRequest:receiver=eq.${user.id}`)
        .on("INSERT", (payload) => {
          console.log("payload", payload);
          setNotifications((notifications) => [...notifications, payload?.new]);
        })
        .on("DELETE", (payload) => {
          setNotifications((notifications) =>
            notifications.filter(
              (notification) => notification.id !== payload?.old?.id
            )
          );
        })
        .subscribe();
      return () => {
        supabase.removeSubscription(mySubscription);
      };
    }
  }, [user]);

  return (
    <UseNotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        acceptFriendRequest,
        loading,
      }}
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
