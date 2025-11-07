import type { Message } from "../types/chat";
import sortMessages from "../utils/sortMessages";

export default async function getRecentMessages(
  token: string
): Promise<Message[]> {
  const host = import.meta.env.VITE_API_URL;

  const response = await fetch(`${host}/api/chat/recentMessages`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const r = await response.json();
    const sortedMessages = sortMessages(r.data);
    return sortedMessages;
  }

  return [];
}
