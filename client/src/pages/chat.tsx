import { LogOut } from "lucide-react";
import MessageBubble from "../components/message-bubble";
import ChatGroupIcon from "../components/chat-thumb";
import ChatDescription from "../components/chat-desc";
import { useEffect, useState } from "react";
import getUser from "../api/user";
import { useAuth } from "../contexts/auth";
import type { User } from "../types/user";
import type { Message } from "../types/chat";
import getRecentMessages from "../api/message";
import useSocket from "../utils/socket";
import Toast from "../components/toast";
import { type ToastType } from "../types/other-types";
import onToastTimeout from "../utils/hideToast";

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [activeNow, setActiveNow] = useState<number>(0);
  const [toast, setToast] = useState<ToastType>();
  const { token, logout } = useAuth();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    fetchUserandMessages();
  }, []);

  useEffect(() => {
    scrollToBotton();
  }, [allMessages]);

  //socket for receiving data

  useEffect(() => {
    if (!socket) {
      console.log("No socket instance found");
      return;
    }
    if (!isConnected) {
      console.log("Not connected...");
      return;
    }

    socket?.emit("getActiveNow");

    //receive recent message - append recent at last
    socket.on("recentMessage", (msgs) => {
      console.log("Messages: ", msgs);
      setAllMessages((prevMsgs) => [...prevMsgs, msgs.createdMsg]);
    });

    //receive connected user counts
    socket.on("onlineUsersCount", (count) => {
      setActiveNow(count);
    });

    //receive new connected username
    socket.on("newConnection", (username) =>
      setToast({ open: true, message: `${username} connected.` })
    );

    //receive user who disconnected
    socket.on("disconnectedUser", (username) =>
      setToast({ open: true, message: `${username} disconnected.` })
    );

    return () => {
      socket.off("recentMessage");
      socket.off("onlineUsersCount");
    };
  }, [socket, isConnected]);

  useEffect(() => {
    const hideToast = async () => {
      if (toast?.open) {
        const hide = await onToastTimeout();
        setToast({ open: hide, message: "" });
      }
    };
    hideToast();
  }, [toast]);

  const fetchUserandMessages = async () => {
    if (token) {
      const userAndMessages = await Promise.all([
        getUser(token),
        getRecentMessages(token),
      ]);
      setUser(userAndMessages[0]);
      setAllMessages(userAndMessages[1]);
      console.log("Messages: ", userAndMessages[1]);
    }
  };

  const scrollToBotton = () => {
    const messageViewBox = document.getElementById("message-view");
    messageViewBox?.scrollTo({
      top: messageViewBox.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    setIsSending(true);

    socket?.emit("sendMessage", inputMessage);
    setInputMessage("");
    setIsSending(false);
  };

  return (
    <div className="w-[600px] bg-card border-2 card-border shadow-md rounded-xl">
      {toast?.open && <Toast message={toast.message} />}

      {/* chat heading bar  */}
      <div className="w-full flex px-5 py-3 border-b-2 card-border space-x-5">
        <div className=" w-[10%]">
          <ChatGroupIcon />
        </div>
        <div className=" w-[30%]">
          <ChatDescription activeNow={activeNow} isConnected={isConnected} />
        </div>
        <div className=" w-[60%] flex justify-end items-center space-x-8">
          <p>{user ? user.name : ""}</p>
          <LogOut
            size={20}
            className="cursor-pointer"
            onClick={() => logout()}
          />
        </div>
      </div>

      {/* message view area  */}
      <div
        id="message-view"
        className="h-115 overflow-y-scroll flex flex-col gap-5"
      >
        {user &&
          allMessages.map((m) => {
            return (
              <MessageBubble
                key={m._id}
                message={m.message}
                timestamp={m.createdAt}
                sender={m.userId}
                currentUser={user.id}
              />
            );
          })}
      </div>

      <div className="border-2 bg-card card-border" />

      {/* message input section  */}
      <div className="py-5 rounded-b-xl">
        <form
          className="flex justify-around"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <textarea
            value={inputMessage}
            placeholder="Type your message here..."
            className="w-[80%] bg-slate-400/40 border-0 rounded-md resize-none focus:outline-2 outline-primary accent-primary"
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFormSubmit(e);
            }}
          ></textarea>
          <button
            type="submit"
            disabled={isSending || inputMessage.length === 0}
            className="bg-primary py-1 px-5 rounded-xl font-semibold text-white hover:bg-[#15803d] transition-colors cursor-pointer disabled:bg-[#15803cb0] disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
