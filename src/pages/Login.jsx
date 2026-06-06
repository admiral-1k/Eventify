import { useState } from "react";
import googleLogo from "../assets/images/google.png";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-10">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#4b2d67] to-[#f2b29c] flex flex-col lg:flex-row">

        {/* LEFT SIDE */}
        <div className="flex-1 text-white p-10 lg:p-20 flex flex-col justify-center">

         <h1 className="text-4xl lg:text-5xl font-bold mb-8">
            Login Your Account
          </h1>

          <p className="text-lg lg:text-2xl leading-relaxed max-w-md">
            For the purpose of industry regulation,
            your details are required.
          </p>

          <div className="mt-32 lg:mt-52 text-lg">
            Haven’t an Account?
            <span className="text-black font-semibold cursor-pointer ml-2">
              Click Here To Register
            </span>
          </div>

        </div>

        {/* RIGHT SIDE */}
       <div className="w-full lg:w-[550px] bg-white/80 backdrop-blur-sm rounded-3xl m-4 lg:m-10 p-10 lg:p-14 shadow-xl">

          {/* EMAIL */}
          <div className="mb-6">
            <label className="block font-semibold mb-3 text-gray-700">
              Email address*
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border border-gray-400 rounded-full px-6 py-4 outline-none focus:border-pink-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-8">
            <label className="block font-semibold mb-3 text-gray-700">
              Password*
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-400 rounded-full px-6 py-4 outline-none focus:border-pink-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 font-semibold text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-5 rounded-full text-lg font-semibold mb-6">
            Login Account
          </button>

          {/* OR TEXT */}
          <div className="text-center text-gray-500 mb-6">
            Or
          </div>

          {/* GOOGLE BUTTON */}
        <button className="w-full border border-black py-4 rounded-full bg-white font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3">
  <img
    src={googleLogo}
    alt="Google"
    className="w-6 h-6"
  />
  <span>Sign in with Google</span>
          </button>

        </div>

      </div>

    </div>
  );
}




