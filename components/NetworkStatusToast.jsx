/* eslint-disable prettier/prettier */
"use client";
import { useEffect } from "react";
import { useToast } from "@heroui/toast"; // Adjust import if your toast hook is different

export function NetworkStatusToast() {
  const { addToast } = useToast();

  useEffect(() => {
    function handleOnline() {
      addToast({
        title: "Back Online",
        description: "You are connected to the internet.",
        status: "success",
        duration: 3000,
      });
    }
    function handleOffline() {
      addToast({
        title: "Offline",
        description: "You are not connected to the internet.",
        status: "warning",
        duration: 3000,
      });
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Optionally, show offline toast if already offline on mount
    if (!navigator.onLine) handleOffline();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [addToast]);

  return null;
}
