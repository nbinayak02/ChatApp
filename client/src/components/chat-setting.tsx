import { SunMoon, UserCircle2 } from "lucide-react";
import { useThemeSwitch } from "../contexts/theme";
import { useNavigate } from "react-router-dom";

export default function Settings({ userId }: { userId: string }) {
  const { toggleTheme } = useThemeSwitch();
  const navigate = useNavigate();
  return (
    <div className="bg-body w-60 absolute z-10 mt-45 border-2 card-border p-2 rounded-xl">
      <ul className="space-y-5">
        <li className="flex gap-3" onClick={() => toggleTheme()}>
          <SunMoon size={20} />
          Change Theme
        </li>
        <li
          className="flex gap-3"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <UserCircle2 size={20} />
          Profile
        </li>
      </ul>
    </div>
  );
}
