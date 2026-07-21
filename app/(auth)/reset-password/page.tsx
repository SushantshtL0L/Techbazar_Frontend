import ResetPasswordForm from "../_components/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
