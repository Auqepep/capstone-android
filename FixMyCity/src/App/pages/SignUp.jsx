import Button from "../../components/button.jsx";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div
          style={{ backgroundColor: "#f7fbfa" }}
          className="rounded-lg shadow-lg shadow-black/30 h-160 pl-8 space-y-3 w-[350px] flex flex-col justify-center"
        >
          <form className="space-y-3" action="">
            <div>
              <h1 className="font-bold text-3xl tracking-wide">SIGN UP</h1>
            </div>

            <div className="mr-5">
              <h1 className="text-zinc-600 font-semibold text-base">Name</h1>
              <input
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#6a9c89] outline-none h-10 px-5 border border-sm w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="mr-5">
              <h1 className="text-zinc-600 font-semibold text-base">Date of Birth</h1>
              <input
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#6a9c89] outline-none h-10 px-5 border border-sm w-full"
                type="date"
                required
              />
            </div>

            <div className="mr-5">
              <h1 className="text-zinc-600 font-semibold text-base">Email</h1>
              <input
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#6a9c89] outline-none h-10 px-5 border border-sm w-full"
                type="text"
                placeholder="Email"
                required
              />
            </div>

            <div className="mr-5">
              <h1 className="text-zinc-600 font-semibold text-base">Password</h1>
              <input
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#6a9c89] outline-none h-10 px-5 border border-sm w-full"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="mr-5">
              <h1 className="text-zinc-600 font-semibold text-base">Confirm Password</h1>
              <input
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#6a9c89] outline-none h-10 px-5 border border-sm w-full"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div className="py-6 mr-5">
              <Button
                title="Sign Up"
                to="/signUp"
                className="py-2 px-30 text-sm w-full"
                condition={true}
              />
              <h1 className="text-end mt-5 text-sm">Forgot Password?</h1>
            </div>

            <div>
              <h1 className="text-zinc-500 text-sm">
                Already have an Account?{" "}
                <span className="text-black font-bold underline underline-offset-4">
                  <Link to="/login">Login</Link>
                </span>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}