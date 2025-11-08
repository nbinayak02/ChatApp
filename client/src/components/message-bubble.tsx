import { useEffect, useState } from "react";
import getDuration from "../utils/duration";

export default function MessageBubble({
  message,
  sender,
  timestamp,
  currentUser,
}: {
  message: string;
  sender: { _id: string; username: string };
  timestamp: string;
  currentUser: string;
}) {
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    setDuration(getDuration(timestamp));
  }, [timestamp]);
  return (
    <div
      className={`w-fit mx-10 ${
        sender._id == currentUser ? `self-end` : `self-start`
      }`}
    >
      <p
        className={`text-sm ml-3 ${
          sender._id === "0" ? "text-rose-500 font-semibold" : ""
        }`}
      >
        {sender._id === currentUser ? "You" : sender.username}
      </p>
      <p className="bg-primary text-white p-3 rounded-xl">{message}</p>
      <p className="text-sm text-muted text-right mr-3">{duration}</p>
    </div>
  );
}
