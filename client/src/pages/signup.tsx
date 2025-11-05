import { Link, useNavigate } from "react-router-dom";
import type { FormState } from "../types/signup";
import { useActionState, useEffect } from "react";
import { performSignup } from "../api/signup";

export default function SignupPage() {
  const navigate = useNavigate();

  const initialState: FormState = {
    error: {},
    isSuccess: false,
  };

  const [state, formAction, isPending] = useActionState(
    performSignup,
    initialState
  );

  useEffect(() => {
    if (state.isSuccess) {
      navigate("/login");
    }
  }, [state]);

  return (
    <div className="w-[400px] bg-card border-2 card-border shadow-md rounded-xl p-5">
      <div className="flex flex-col gap-8 px-2">
        <div>
          <h1 className="font-semibold text-heading mb-1">Signup to ChatApp</h1>
          <h3 className="text-subheading">Enter your details to signup.</h3>
        </div>
        {state.error?.serverReturnedError && (
          <div className="text-title bg-rose-900/50 p-2 border-2 border-rose-600/50 rounded-xl ">
            {state.error.serverReturnedError}
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
            <label htmlFor="username" className="text-title">
              User Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-slate-400/40 border-0 rounded-md p-2 ring-secondary focus:outline-2 outline-primary"
            />
            {state.error?.username && (
              <label className="text-title text-rose-500">
                {state.error.username}
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
          <div className="grid gap-2">
            <label htmlFor="cpassword" className="text-title">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              className="bg-slate-400/40 border-0 rounded-md p-2 focus:outline-2 outline-primary"
            />
            {state.error?.cpassword && (
              <label className="text-title text-rose-500">
                {state.error.cpassword}
              </label>
            )}
          </div>

          <div className="grid gap-3">
            <button
              type="submit"
              className="bg-primary p-2 rounded-md font-semibold text-white hover:bg-[#15803d] transition-colors cursor-pointer disabled:bg-slate-500"
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Signup"}
            </button>

            <p className="text-center text-title">
              Already have an account?{" "}
              <Link to={"/login"} className="text-green-500">
                Log in here.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
