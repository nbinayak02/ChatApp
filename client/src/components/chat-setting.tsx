import { SunMoon, Trash2, UserRoundPen } from "lucide-react";
import { useThemeSwitch } from "../contexts/theme";

export default function Settings() {
  const { toggleTheme } = useThemeSwitch();
  return (
    <div className="bg-body w-60 absolute z-10 mt-45 border-2 card-border p-2 rounded-xl">
      <ul className="space-y-5">
        <li
          className="flex gap-3"
          onClick={() => toggleTheme()}
        >
          <SunMoon size={20} />Change Theme
        </li>
        <li className="flex gap-3">
          <UserRoundPen size={20} /> Update Profile
        </li>
        <li className="flex gap-3 text-rose-600">
          <Trash2 size={20} /> Delete Profile
        </li>
      </ul>
    </div>
  );
}
