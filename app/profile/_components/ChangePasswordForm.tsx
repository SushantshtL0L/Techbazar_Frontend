"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock, FiArrowRight, FiShield } from "react-icons/fi";
import { changePasswordSchema } from "@/app/(auth)/schema";
import { handleChangePassword } from "@/lib/actions/auth.actions";
import { toast } from "react-toastify";

interface ChangePasswordFormProps {
  isDark?: boolean;
}

interface PasswordField {
  name: "currentPassword" | "newPassword" | "confirmNewPassword";
  label: string;
  placeholder: string;
  show: boolean;
  setShow: (v: boolean) => void;
}

export default function ChangePasswordForm({ isDark = false }: ChangePasswordFormProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fields: PasswordField[] = [
    { name: "currentPassword", label: "Current Password", placeholder: "Enter current password", show: showCurrent, setShow: setShowCurrent },
    { name: "newPassword", label: "New Password", placeholder: "Enter new password", show: showNew, setShow: setShowNew },
    { name: "confirmNewPassword", label: "Confirm New Password", placeholder: "Re-enter new password", show: showConfirm, setShow: setShowConfirm },
  ];

  const inputClass = `w-full border-none rounded-2xl py-4 pl-12 pr-12 outline-none transition-all focus:ring-2 focus:ring-teal-400 font-medium ${
    isDark ? "bg-neutral-800 text-white placeholder-neutral-500" : "bg-neutral-100 text-neutral-900 placeholder-neutral-400"
  }`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmNewPassword: formData.get("confirmNewPassword") as string,
    };

    const result = changePasswordSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    try {
      const response = await handleChangePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.success) {
        toast.success(response.message || "Password changed successfully!");
        e.currentTarget.reset();
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-8 rounded-[40px] border transition-colors shadow-sm ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-100"}`}>

      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pb-10 border-b border-neutral-800/20">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
          <FiShield className={`text-2xl ${isDark ? "text-teal-400" : "text-teal-600"}`} />
        </div>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
            Security
          </p>
          <h2 className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
            Change Password
          </h2>
        </div>
      </div>

      {/* Password Tips */}
      <div className={`mb-8 p-5 rounded-2xl ${isDark ? "bg-neutral-800/60" : "bg-neutral-50"}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
          Password Requirements
        </p>
        <ul className="space-y-1.5">
          {["At least 6 characters", "Mix of letters and numbers recommended", "Avoid using your name or email"].map((tip) => (
            <li key={tip} className={`flex items-center gap-2 text-xs font-medium ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? "bg-teal-400" : "bg-teal-500"}`} />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map(({ name, label, placeholder, show, setShow }) => (
          <div key={name}>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
              {label}
            </label>
            <div className="relative">
              <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-neutral-500" : "text-neutral-400"}`} />
              <input
                type={show ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                required
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-700"}`}
              >
                {show ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? "bg-white text-black hover:bg-neutral-200 shadow-black/20"
                : "bg-neutral-900 text-white hover:bg-neutral-700 shadow-neutral-200"
            }`}
          >
            {isLoading ? (
              <>
                <span className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDark ? "border-black" : "border-white"}`} />
                Updating...
              </>
            ) : (
              <>
                Update Password
                <FiArrowRight />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
