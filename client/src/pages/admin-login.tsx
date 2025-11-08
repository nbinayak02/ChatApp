import { Link, useNavigate } from "react-router-dom";
import type { FormState } from "../types/login";
import { useActionState, useEffect } from "react";
import { performAdminLogin } from "../api/admin-login";

export default function AdminLogin() {
  const navigate = useNavigate();
  const initialState: FormState = {
    token: "",
    error: {},
    isSuccess: false,
  };

  const [state, formAction, isPending] = useActionState(
    performAdminLogin,
    initialState
  );

  useEffect(() => {
    if (state.isSuccess) {
      navigate("/admin", { state: { isLoggedIn: true }, replace: true });
    }
  });

  return (
    <div className="w-[400px] bg-card border-2 card-border shadow-md rounded-xl p-5">
      <div className="flex flex-col gap-8 px-2">
        <div>
          <h1 className="font-semibold text-heading mb-1">
            Login to ChatApp Admin
          </h1>
          <h3 className="text-subheading">Enter admin login details.</h3>
        </div>
        {state.error?.otherError && (
          <div className="text-title bg-rose-900/50 p-2 border-2 border-rose-600/50 rounded-xl ">
            {state.error.otherError}
          </div>
        )}
        <form className="flex flex-col gap-8" action={formAction}>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-title">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-slate-400/40 border-0 rounded-md p-2 ring-secondary focus:outline-2 outline-primary"
            />
            {state.error?.email && (
              <label className="text-title text-rose-500">
                {state.error.email}
              </label>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-title">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-slate-400/40 border-0 rounded-md p-2 focus:outline-2 outline-primary"
            />
            {state.error?.password && (
              <label className="text-title text-rose-500">
                {state.error.password}
              </label>
            )}
          </div>

          <div className="grid gap-3">
            <button
              type="submit"
              className="bg-primary p-2 rounded-md font-semibold text-white hover:bg-[#15803d] transition-colors cursor-pointer disabled:bg-slate-400"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-title">
              <Link to={"/login"} className="text-green-500">
                User Login.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
