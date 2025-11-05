import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="flex flex-row">
        Loading...{" "}
        <p className="animate-spin">
          <Loader />
        </p>
      </div>
    </div>
  );
}
