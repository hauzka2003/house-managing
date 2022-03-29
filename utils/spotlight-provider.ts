// import { Button, Group } from "@mantine/core";
// import { SpotlightProvider, useSpotlight } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";

export const actions: SpotlightAction[] = [
  {
    title: "dashboard",
    description: "Get to the dashboard",
    onTrigger: () => {
      //   router.push("/dashboard");
    },
  },
  {
    title: "Tenants",
    description: "Get to the tenants page",
    onTrigger: () => {
      //   router.push("/dashboard/tenants");
    },
  },
  {
    title: "Buildings",
    description: "Get to the buildings page",
    onTrigger: () => {
      //   router.push("/dashboard/buildings");
    },
  },
  {
    title: "Receipts",
    description: "Get to the receipts page",
    onTrigger: () => {
      //   router.push("/dashboard/receipts");
    },
  },
  {
    title: "Profit",
    description: "Get to the profit page",
    onTrigger: () => {
      //   router.push("/dashboard/profit");
    },
  },
  {
    title: "Settings",
    description: "Get to the settings page",
    onTrigger: () => {
      //   router.push("/dashboard/settings");
    },
  },

  {
    title: "AI Assistant",
    description: "Get to the AI Assistant page",
    onTrigger: () => {
      //   router.push("/dashboard/AI-assistant");
    },
  },
  {
    title: "Logout",
    description: "You can even logout in here",
    onTrigger: () => {
      //   router.push("/");
    },
  },
];
