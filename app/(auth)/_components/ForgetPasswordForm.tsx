"use client";

import Link from "next/link";
import { useState } from "react";
import { forgetPasswordSchema } from "../schema";
import { handleForgotPassword } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const result = forgetPasswordSchema.safeParse({ email });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await handleForgotPassword(email);
      if (response.success) {
        setIsSent(true);
        toast.success("Reset link sent to your email!");
      } else {
        toast.error(response.message || "Failed to send reset link");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="w-full text-center">
        <div className="flex justify-center mb-6 text-[#0A2540]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[#0f172a] mb-2">Check Your Email</h2>
        <p className="text-sm text-slate-500 mb-8">
          We&apos;ve sent a password reset link to your email address. It will expire in 1 hour.
        </p>
        <Link
          href="/login"
          className="block w-full rounded-xl bg-[#0A2540] py-4 font-semibold text-white transition-all hover:bg-[#164070] text-center"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-left mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-2">Forgot Password?</h2>
        <p className="text-sm text-slate-500">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 outline-none focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#0A2540] py-4 font-semibold text-white transition-all hover:bg-[#164070] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-[#0A2540] transition-colors">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
