import type { Message } from "../types/chat";

function sortMessages(messages: Message[]) {
  messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  return messages;
}

export default sortMessages;
