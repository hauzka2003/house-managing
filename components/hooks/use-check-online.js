import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../../utils/supabase";

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

const OnlineStatusContext = createContext(true);

export function OnlineStatusProvider({ children }) {
  const [online, setOnline] = useState(true);

  async function checkStatus() {
    const onlineStatus = await CheckOnlineStatus();
    setOnline(onlineStatus);
  }

  useEffect(() => {
    let checkStatusId;
    window.addEventListener("offline", setOnline(false));
    checkStatusId = setInterval(checkStatus, onlinePollingInterval);
    return () => {
      window.removeEventListener("offline", setOnline(false));
      clearInterval(checkStatusId);
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={online}>
      {children}
    </OnlineStatusContext.Provider>
  );
}

export function useOnlineStatus() {
  const online = useContext(OnlineStatusContext);

  // if (!online) {
  //   throw new Error(
  //     `useOnlineStatus must be used within a OnlineStatusProvider.`
  //   );
  // }

  return online;
}
