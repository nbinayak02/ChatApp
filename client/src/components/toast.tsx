export default function Toast({ message }: { message: string }) {
  return (
    <div className="px-3 py-1 w-fit bg-card border-2 card-border text-unmuted text-sm rounded-xl absolute z-10 top-2 right-[40%]">
      {message}
    </div>
  );
}
