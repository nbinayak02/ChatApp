export default function MessageBubble({
  message,
  username,
  timestamp,
  userId,
}: {
  message: string;
  username: string;
  timestamp: string;
  userId:string;
}) {
  return (
    <div
      className={`w-fit mx-10 ${
        userId == "6909afdca9fdf78e9869136a" ? `self-end` : `self-start`
      }`}
    >
      <p className="text-sm ml-3">{username}</p>
      <p className="bg-primary p-3 rounded-xl">{message}</p>
      <p className="text-sm text-muted text-right mr-3">
        {new Date(timestamp).toDateString()}
      </p>
    </div>
  );
}
