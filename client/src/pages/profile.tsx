import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import type { UserDetails } from "../types/user";
import getUserDetails from "../api/user-details";
import {
  Check,
  CheckCheck,
  CheckCircleIcon,
  Edit2,
  LoaderIcon,
  Mail,
  RectangleEllipsis,
  UserCircle2,
} from "lucide-react";

export default function Profile() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails>();
  const [optionHover, setOptionHover] = useState<{ field: string } | null>(
    null
  );
  const [editClicked, setEditClicked] = useState<{ field: string } | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(true);

  useEffect(() => {
    if (!id) navigate("/");
    (async function () {
      if (token) {
        const user = await getUserDetails(token);
        if (user) setUser(user);
      }
    })();
  }, []);

  return (
    <div className="w-[450px] bg-card border-2 card-border shadow-md rounded-xl p-5">
      <h1 className="font-semibold text-heading mb-1 ">Profile</h1>
      <h3 className="text-subheading">Your profile details</h3>

      <div className="mt-8 space-y-5 px-3">
        <div
          className="flex gap-5 items-center"
          onMouseOver={() => setOptionHover({ field: "username" })}
        >
          <UserCircle2 size={24} />
          {editClicked && editClicked.field === "username" ? (
            <input
              type="text"
              value={user?.username}
              className="bg-slate-400/40 border-0 rounded-md p-2 ring-secondary focus:outline-2 outline-primary"
              autoFocus
              disabled={isUpdating}
            />
          ) : (
            user?.username
          )}

          {editClicked && editClicked.field === "username" ? (
            <button
              className="bg-primary py-2 px-4 rounded-md font-semibold hover:cursor-pointer disabled:cursor-progress"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <p className="animate-spin">
                  <LoaderIcon />
                </p>
              ) : (
                "Save"
              )}
            </button>
          ) : optionHover && optionHover.field === "username" ? (
            <Edit2
              size={20}
              onClick={() => setEditClicked({ field: "username" })}
            />
          ) : (
            <></>
          )}
        </div>
        <div
          className="flex gap-5 items-center"
          onMouseOver={() => setOptionHover({ field: "email" })}
        >
          <Mail size={24} />

          {editClicked && editClicked.field === "email" ? (
            <input
              type="text"
              value={user?.email}
              className="bg-slate-400/40 border-0 rounded-md p-2 ring-secondary focus:outline-2 outline-primary"
              autoFocus
              disabled={isUpdating}
            />
          ) : (
            user?.email
          )}
          {editClicked && editClicked.field === "email" ? (
            <button
              className="bg-primary py-2 px-4 rounded-md font-semibold hover:cursor-pointer disabled:cursor-progress"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <p className="animate-spin">
                  <LoaderIcon />
                </p>
              ) : (
                "Save"
              )}
            </button>
          ) : optionHover && optionHover.field === "email" ? (
            <Edit2
              size={20}
              onClick={() => setEditClicked({ field: "email" })}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-5 items-center">
          <RectangleEllipsis size={24} /> Change Password
        </div>
      </div>
    </div>
  );
}
