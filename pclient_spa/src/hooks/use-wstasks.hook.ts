import { useEffect } from "react";
import { io } from "socket.io-client";
import { useLogsStore } from "../stores/logs.store";

export const UseWsTasks = () => {
  const { setCompletedTask } = useLogsStore((state) => state);
  return useEffect(() => {
    // const socket = io(`${window.location.origin}/tasks`)
    // const socket = io(`http://localhost:5555/tasks`)
    const socket = io("");

    console.log("init");

    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("message", (data) => {
      console.log(`Message1 from server:`, data);
    });

    socket.on("tasks", (data) => {
      console.log(`DATA from server:`, data);
      if (data.id) {
        setCompletedTask({
          uuid: data.id,
          description: data?.description || {},
        });
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
