import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Mail } from "lucide-react";
import Container from "../components/common/Container";
import { eventStore } from "../data/eventStore";
import apiClient from "../api/apiClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.post("/users/forgot-password", { email });
      toast.success("Reset link generated.");
      navigate(`/reset-password?token=${encodeURIComponent(response.data.token)}`);
    } catch {
      const exists = eventStore.getUsers().some((user) => user.email.toLowerCase() === email.toLowerCase());
      if (!exists) {
        toast.error("No account found with that email.");
        return;
      }
      const token = btoa(`${email}:${Date.now()}`);
      localStorage.setItem("eventify_reset_request", JSON.stringify({ email, token }));
      toast.success("Reset link generated.");
      navigate(`/reset-password?token=${encodeURIComponent(token)}`);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-white py-10 sm:py-14">
      <Container>
        <form onSubmit={submit} className="mx-auto max-w-md rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-orange-600">Password</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Forgot password</h1>
          <p className="mt-2 text-sm text-neutral-500">Enter your email and continue to reset your password.</p>
          <label className="mt-6 block text-sm font-medium text-neutral-800">
            Email address
            <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-neutral-200 px-4 focus-within:border-orange-500">
              <Mail size={18} className="text-neutral-400" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="you@example.com" className="w-full border-none bg-transparent text-sm outline-none" />
            </div>
          </label>
          <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-600 text-sm font-semibold text-white">
            Continue <ArrowRight size={18} />
          </button>
          <Link to="/signin" className="mt-5 block text-center text-sm font-semibold text-orange-600">Back to sign in</Link>
        </form>
      </Container>
    </section>
  );
}
