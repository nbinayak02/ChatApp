import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { type UpdateProfileReturnType, type UserDetails } from "../types/user";
import getUserDetails from "../api/user-details";
import { Edit2, LoaderIcon, Mail, Trash2, UserCircle2 } from "lucide-react";
import UpdateUserName from "../api/update-name";
import DeleteAccount from "../api/delete-account";

export default function Profile() {
  const { id } = useParams();
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails>();

  //to track hover
  const [optionHover, setOptionHover] = useState<{ field: string } | null>(
    null
  );

  //to track edit button click
  const [editClicked, setEditClicked] = useState<{ field: string } | null>(
    null
  );

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [returnData, setReturnData] = useState<UpdateProfileReturnType | null>(
    null
  );
  const [usernameInput, setUsernameInput] = useState<string>();

  useEffect(() => {
    if (!id) navigate("/");
    (async function () {
      if (token) {
        const user = await getUserDetails(token);
        if (user) setUser(user);
      }
    })();
  }, []);

  const handleUsernameUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (usernameInput && token && user) {
      setIsUpdating(true);
      //send request to api
      const updateStatus = await UpdateUserName(
        usernameInput,
        token,
        user?._id
      );

      //if success then update user state
      if (updateStatus.isSuccess && updateStatus.returnData) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            username: updateStatus.returnData,
          };
        });

        //then hide input box
        setEditClicked(null);
        setIsUpdating(false);
        setUsernameInput("");
      }

      //for errors
      setReturnData(updateStatus);
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (user && token) {
      const isDeleted = await DeleteAccount(user?._id, token);

      if (isDeleted) logout();
    }
  };

  return (
    <div className="w-[450px] bg-card border-2 card-border shadow-md rounded-xl p-5">
      <h1 className="font-semibold text-heading mb-1 ">Profile</h1>
      <h3 className="text-subheading">Your profile details</h3>

      <div className="mt-8 space-y-5 px-3">
        {/* username field  */}
        <div
          className="flex gap-5 items-center"
          onMouseOver={() => setOptionHover({ field: "username" })}
        >
          <UserCircle2 size={24} />
          {/* //if edit clicked then show input box. */}
          {editClicked && editClicked.field === "username" ? (
            <input
              type="text"
              value={usernameInput || " "}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="bg-slate-400/40 border-0 rounded-md p-2 ring-secondary focus:outline-2 outline-primary"
              autoFocus
            />
          ) : (
            // else show username
            user?.username
          )}
          {/* //if edit is clicked then show save button */}
          {editClicked && editClicked.field === "username" ? (
            <button
              className="bg-primary py-2 px-4 rounded-md font-semibold hover:cursor-pointer disabled:cursor-progress"
              disabled={isUpdating}
              onClick={(e) => handleUsernameUpdate(e)}
            >
              {isUpdating ? (
                <p className="animate-spin">
                  <LoaderIcon />
                </p>
              ) : (
                "Save"
              )}
            </button>
          ) : //else if mouse hovers it then show edit button
          optionHover && optionHover.field === "username" ? (
            <Edit2
              size={20}
              className="cursor-pointer"
              onClick={() => setEditClicked({ field: "username" })}
            />
          ) : (
            //else do nothing
            <></>
          )}
        </div>
        {/* //if username field has error then show it */}
        {returnData?.error?.field === "username" ? (
          <div className="text-rose-500">{returnData.error.errorMessage}</div>
        ) : (
          <></>
        )}
        {/* email field  */}
        <div className="flex gap-5 items-center">
          <Mail size={24} />

          {user?.email}
        </div>

        <div
          className="flex gap-5 items-center text-rose-500 cursor-pointer"
          onClick={() => handleDeleteAccount()}
        >
          <Trash2 size={20} /> Delete Account
        </div>
      </div>
    </div>
  );
}
