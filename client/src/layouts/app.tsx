import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}
