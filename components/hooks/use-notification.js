import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../../store/user";
import { supabase } from "../../utils/supabase";

const UseNotificationContext = createContext();

export function UseNotificationProvider({ children }) {
  const [backNotifications, setbackNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState();
  let mySubscription = null;

  const { user } = useUser();

  console.log("backNotifications", backNotifications);

  async function getUserInfor(payload) {
    let newNotification;
    await axios
      .get(`/api/search-userbyid/${payload.sender}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        newNotification = {
          ...res?.data,
          id: payload?.id,
          type: "friend",
          sender: payload?.sender,
          created: payload?.created,
        };

        if (backNotifications.find((item) => item.id === newNotification.id)) {
          return;
        }

        setbackNotifications((notifications) => [
          ...notifications,
          newNotification,
        ]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function FetchUserDetail(payload) {
    let newNotification;
    await axios
      .get(`/api/search-userbyid/${payload?.new?.sender}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        newNotification = {
          ...res?.data,
          id: payload?.new?.id,
          type: "friend",
          sender: payload?.new?.sender,
          created: payload?.new?.created,
        };

        setbackNotifications((notifications) => [
          ...notifications,
          newNotification,
        ]);
        if (notifications?.length <= 5) {
          setNotifications((notifications) => [
            ...notifications,
            newNotification,
          ]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function declineFriendRequest(request) {
    try {
      await axios.post(`/api/request/decline-friend/`, {
        id: request.id,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async function acceptFriendRequest(request) {
    if (!request) return;

    await axios
      .post(`/api/request/accept-friend`, {
        friendID: request.sender,
        id: request.id,
      })
      .then((response) => {
        console.log("response.data", response);

        if (response.status === 200) {
          setbackNotifications(
            backNotifications.filter(
              (notification) => notification.id !== request.id
            )
          );
          setLoading({ text: "Cancel friend", type: "friend" });
        }
      })
      .catch((err) => console.log(err));
  }

  // console.log(backNotifications);

  useEffect(() => {
    async function getbackNotifications() {
      const { data } = await supabase
        .from("friendRequest")
        .select("*")
        .eq("receiver", user?.id);

      data.forEach((request) => {
        getUserInfor(request);
      });
    }

    if (!user) {
      supabase.removeSubscription(mySubscription);
      mySubscription = null;
      setNotifications([]);
      setbackNotifications([]);
    }

    if (user && !mySubscription) {
      getbackNotifications();

      mySubscription = supabase
        .from(`friendRequest:receiver=eq.${user.id}`)
        .on("INSERT", (payload) => {
          console.log("payload", payload);
          FetchUserDetail(payload);
        })
        .on("DELETE", (payload) => {
          setbackNotifications((backNotifications) =>
            backNotifications.filter(
              (notification) => notification.id !== payload?.old?.id
            )
          );
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
        backNotifications,
        setbackNotifications,
        acceptFriendRequest,
        loading,
        notifications,
        setNotifications,
        declineFriendRequest,
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
