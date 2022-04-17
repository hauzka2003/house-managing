// import { Button, Group } from "@mantine/core";
// import { SpotlightProvider, useSpotlight } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";
import Router from "next/router";

import { supabase } from "./supabase";

const logOut = (): void => {
  supabase.auth.signOut();
  Router.push("/log-in");
};

export const actions: SpotlightAction[] = [
  {
    title: "dashboard",
    description: "Get to dashboard",
    onTrigger: () => {
      Router.push("/dashboard");
    },
  },
  {
    title: "Tenants",
    description: "Get to tenants page",
    onTrigger: () => {
      Router.push("/dashboard/tenants");
    },
  },
  {
    title: "Buildings",
    description: "Get to buildings page",
    onTrigger: () => {
      Router.push("/dashboard/buildings");
    },
  },
  {
    title: "Receipts",
    description: "Get to receipts page",
    onTrigger: () => {
      Router.push("/dashboard/receipt");
    },
  },
  {
    title: "Profit",
    description: "Get to profit page",
    onTrigger: () => {
      Router.push("/dashboard/profit");
    },
  },
  {
    title: "Setting",
    description: "Get to settings page",
    onTrigger: () => {
      Router.push("/dashboard/setting");
    },
  },

  {
    title: "AI Assistant",
    description: "Get to AI Assistant page",
    onTrigger: () => {
      Router.push("/dashboard/AI-assistant");
    },
  },

  {
    title: "Social",
    description: "Get to social page",
    onTrigger: () => {
      Router.push("/dashboard/social");
    },
  },
  {
    title: "Logout",
    description: "click to logout",
    onTrigger: logOut,
  },
];
