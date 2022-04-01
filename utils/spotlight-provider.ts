// import { Button, Group } from "@mantine/core";
// import { SpotlightProvider, useSpotlight } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";
import Router from "next/router";
import CalendarIcon from "../components/icons/calendar";

export const actions: SpotlightAction[] = [
  {
    title: "dashboard",
    description: "Get to the dashboard",
    onTrigger: () => {
      Router.push("/dashboard");
    },
    
  },
  {
    title: "Tenants",
    description: "Get to the tenants page",
    onTrigger: () => {
      Router.push("/dashboard/tenants");
    },
  },
  {
    title: "Buildings",
    description: "Get to the buildings page",
    onTrigger: () => {
      Router.push("/dashboard/buildings");
    },
  },
  {
    title: "Receipts",
    description: "Get to the receipts page",
    onTrigger: () => {
      Router.push("/dashboard/receipt");
    },
  },
  {
    title: "Profit",
    description: "Get to the profit page",
    onTrigger: () => {
      Router.push("/dashboard/profit");
    },
  },
  {
    title: "Setting",
    description: "Get to the settings page",
    onTrigger: () => {
      Router.push("/dashboard/setting");
    },
  },

  {
    title: "AI Assistant",
    description: "Get to the AI Assistant page",
    onTrigger: () => {
      Router.push("/dashboard/AI-assistant");
    },
  },
];
