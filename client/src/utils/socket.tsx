import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/auth";
import { io, type Socket } from "socket.io-client";

export default function useSocket() {
  const { token } = useAuth();
  const host = import.meta.env.VITE_API_URL;

  //using useRef hook because useState re-renders when value changes so it may cause to re create socket connection, where useRef holds the reference and can be used across re-renders i.e. it doesn't cause re-render and it's value also doesn't change across re-renders
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const socketInstance: Socket = io(host, {
      auth: { token },
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.current = socketInstance;

    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  return { socket: socket.current, isConnected };
}
