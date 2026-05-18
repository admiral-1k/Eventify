import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import logo from "../assets/images/logo.png";

export default function SignUp() {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#fafafa] py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <Link to="/" className="inline-flex justify-center">
                <img
                  src={logo}
                  alt="Eventify"
                  className="h-12 w-auto object-contain"
                />
              </Link>

              <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-950">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Join Eventify to book events, save tickets, and explore what is
                happening near you.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Full name
                </label>

                <div className="flex h-12 items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10">
                  <User size={18} className="text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border-none bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Email address
                </label>

                <div className="flex h-12 items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10">
                  <Mail size={18} className="text-neutral-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border-none bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Phone number
                </label>

                <div className="flex h-12 items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10">
                  <Phone size={18} className="text-neutral-400" />
                  <input
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="w-full border-none bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Password
                </label>

                <div className="flex h-12 items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10">
                  <Lock size={18} className="text-neutral-400" />
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full border-none bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-600 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                Create account
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-neutral-50 px-4 py-4 text-center">
              <p className="text-sm text-neutral-600">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
            By creating an account, you agree to Eventify&apos;s{" "}
            <Link to="/terms" className="text-neutral-600 hover:text-orange-600">
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-neutral-600 hover:text-orange-600"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}