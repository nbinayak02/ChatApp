export default function ChatDescription({
  activeNow,
  isConnected,
}: {
  activeNow: number;
  isConnected: boolean;
}) {

  return (
    <div>
      <h1 className="text-heading font-semibold">ChatApp</h1>

      <div className="flex flex-row gap-2 items-center text-subheading">
        <div
          className={`w-2 h-2 ${
            isConnected ? "" : "animate-pulse"
          } bg-green-400 rounded-full`}
        ></div>
        {isConnected ? (
          <span className="text-sm">{activeNow} Active now</span>
        ) : (
          <span className="text-sm animate-pulse">Connecting...</span>
        )}
      </div>
    </div>
  );
}
