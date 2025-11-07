export default function ChatDescription() {
  return (
    <div>
      <h1 className="text-heading font-semibold">ChatApp</h1>

      <div className="flex flex-row gap-2 items-center text-subheading">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-sm">500 Active now</span>
      </div>
    </div>
  );
}
