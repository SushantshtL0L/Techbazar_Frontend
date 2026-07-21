"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RegisterForm from "../_components/RegisterForm";

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return <RegisterForm redirectTo={redirectTo} />;
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />}>
      <RegisterPageContent />
    </Suspense>
  );
}
