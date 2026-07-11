import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Lock } from "lucide-react";
import Container from "../components/common/Container";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateLocalPassword } = useAuth();

  const submit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await apiClient.post("/users/reset-password", {
        token: searchParams.get("token"),
        password,
      });
      toast.success("Password reset successfully.");
      navigate("/signin");
    } catch {
      const saved = JSON.parse(localStorage.getItem("eventify_reset_request") || "null");
      if (!saved || saved.token !== searchParams.get("token")) {
        toast.error("Reset link is invalid or expired.");
        return;
      }
      const result = updateLocalPassword(saved.email, password);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      localStorage.removeItem("eventify_reset_request");
      toast.success("Password reset successfully.");
      navigate("/signin");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-white py-10 sm:py-14">
      <Container>
        <form onSubmit={submit} className="mx-auto max-w-md rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-orange-600">Password</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Reset password</h1>
          <p className="mt-2 text-sm text-neutral-500">Create a new password for your account.</p>
          {[["New password", password, setPassword], ["Confirm password", confirmPassword, setConfirmPassword]].map(([label, value, setter]) => (
            <label key={label} className="mt-5 block text-sm font-medium text-neutral-800">
              {label}
              <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-neutral-200 px-4 focus-within:border-orange-500">
                <Lock size={18} className="text-neutral-400" />
                <input value={value} onChange={(event) => setter(event.target.value)} type="password" required className="w-full border-none bg-transparent text-sm outline-none" />
              </div>
            </label>
          ))}
          <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-600 text-sm font-semibold text-white">
            Reset password <ArrowRight size={18} />
          </button>
          <Link to="/signin" className="mt-5 block text-center text-sm font-semibold text-orange-600">Back to sign in</Link>
        </form>
      </Container>
    </section>
  );
}
