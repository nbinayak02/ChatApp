import { useEffect } from "react";
import { useAuth } from "../contexts/auth";

export default function ChatPage() {
  const { token, logout } = useAuth();
  const host = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFn = async () => {
      const response = await fetch(`${host}/api/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Data: ", data);
    };
    fetchFn();
  }, []);
  return (
    <>
      <h1>Welcome to chat page</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
