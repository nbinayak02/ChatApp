import { LogOut } from "lucide-react";
import MessageBubble from "../components/message-bubble";
import ChatGroupIcon from "../components/chat-thumb";
import ChatDescription from "../components/chat-desc";
import { useEffect } from "react";

export default function ChatPage() {
  useEffect(() => {
    scrollToBotton();
  }, []);

  const scrollToBotton = () => {
    const messageViewBox = document.getElementById("message-view");
    messageViewBox?.scrollTo({
      top: messageViewBox.scrollHeight,
      behavior: "smooth",
    });
  };

  const allMessages = [
    {
      id: 1,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "Hey!",
      timestamp: "2024-11-06T09:15:23Z",
    },
    {
      id: 2,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "What's up?",
      timestamp: "2024-11-06T09:16:45Z",
    },
    {
      id: 3,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "Got a minute?",
      timestamp: "2024-11-06T09:18:12Z",
    },
    {
      id: 4,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "Sure",
      timestamp: "2024-11-06T09:19:34Z",
    },
    {
      id: 5,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "The auth flow is confusing",
      timestamp: "2024-11-06T09:20:56Z",
    },
    {
      id: 6,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "Which part?",
      timestamp: "2024-11-06T09:23:15Z",
    },
    {
      id: 7,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "JWT or sessions?",
      timestamp: "2024-11-06T09:25:42Z",
    },
    {
      id: 8,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "I'll check with the team lead",
      timestamp: "2024-11-06T09:27:18Z",
    },
    {
      id: 9,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "Thanks!",
      timestamp: "2024-11-06T09:30:05Z",
    },
    {
      id: 10,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "No problem",
      timestamp: "2024-11-06T09:32:50Z",
    },
    {
      id: 11,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "What about 2FA?",
      timestamp: "2024-11-06T09:35:22Z",
    },
    {
      id: 12,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "That's phase 2",
      timestamp: "2024-11-06T09:37:44Z",
    },
    {
      id: 13,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "Got it 👍",
      timestamp: "2024-11-06T09:39:15Z",
    },
    {
      id: 14,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "Let's sync Wednesday?",
      timestamp: "2024-11-06T09:40:33Z",
    },
    {
      id: 15,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "2 PM works",
      timestamp: "2024-11-06T10:15:27Z",
    },
    {
      id: 16,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "Perfect, I'll send an invite",
      timestamp: "2024-11-06T10:17:52Z",
    },
    {
      id: 17,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "Seen the new designs?",
      timestamp: "2024-11-06T10:19:08Z",
    },
    {
      id: 18,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "Not yet, where?",
      timestamp: "2024-11-06T10:20:45Z",
    },
    {
      id: 19,
      userId: "6909afdca9fdf78e9869136a",
      username: "Sarah Chen",
      message: "Check #design on Slack",
      timestamp: "2024-11-06T10:22:11Z",
    },
    {
      id: 20,
      userId: "507f1f77bcf86cd799439012",
      username: "Mike Johnson",
      message: "Will do, thanks! 🚀",
      timestamp: "2024-11-06T10:23:33Z",
    },
  ];
  return (
    <div className="w-[600px] bg-card border-2 card-border shadow-md rounded-xl">
      {/* chat heading bar  */}
      <div className="w-full flex px-5 py-3 border-b-2 card-border space-x-5">
        <div className=" w-[10%]">
          <ChatGroupIcon />
        </div>
        <div className=" w-[60%]">
          <ChatDescription />
        </div>
        <div className=" w-[30%] flex justify-center items-center space-x-8">
          <p>Username</p>
          <LogOut size={20} />
        </div>
      </div>

      {/* message view area  */}
      <div
        id="message-view"
        className="h-120 overflow-y-scroll flex flex-col gap-5"
      >
        {allMessages.map((m) => {
          return (
            <MessageBubble
              message={m.message}
              timestamp={m.timestamp}
              username={m.username}
              userId={m.userId}
            />
          );
        })}
      </div>

      <div className="border-2 bg-card card-border" />

      {/* message input section  */}
      <div className="py-5 rounded-b-xl">
        <form className="flex justify-around">
          <textarea
            placeholder="Type your message here..."
            className="w-[80%] bg-slate-400/40 border-0 rounded-md p-2 resize-none focus:outline-2 outline-primary accent-primary"
          ></textarea>
          <button
            type="submit"
            className="bg-primary py-1 px-5 rounded-xl font-semibold text-white hover:bg-[#15803d] transition-colors cursor-pointer disabled:bg-slate-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
