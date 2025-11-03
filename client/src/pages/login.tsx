import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="w-[400px] bg-card border-2 card-border shadow-md rounded-xl p-5">
      <div className="flex flex-col gap-8 px-2">
        <div>
          <h1 className="font-semibold text-heading mb-1">Login to ChatApp</h1>
          <h3 className="text-subheading">Enter your login details.</h3>
        </div>
        {/* <div className="bg-rose-900/50 p-2 border-2 border-rose-600/50 rounded-xl ">
          Invalid username or password.
        </div> */}
        <form className="flex flex-col gap-8">
          <div className="grid gap-2">
            <label htmlFor="username" className="text-title">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-slate-400/40 border-0 rounded-md p-2 ring-secondary focus:outline-2 outline-primary"
            />
            {/* <label className="text-title text-rose-500">
              Username is required
            </label> */}
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
            {/* <label className="text-title text-rose-500">
              Password is required
            </label> */}
          </div>
          <div className="flex flex-row justify-end gap-2">
            <input type="checkbox" id="remember" className="accent-primary" />
            <label className="text-title" htmlFor="remember">
              Remember Me
            </label>
          </div>
          <div className="grid gap-3">
            <button
              type="submit"
              className="bg-primary p-2 rounded-md font-semibold text-white hover:bg-[#15803d] transition-colors cursor-pointer"
            >
              Login
            </button>

            <p className="text-center text-title">
              New to ChatApp?{" "}
              <Link to={"/signup"} className="text-green-500">
                Sign up here.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
