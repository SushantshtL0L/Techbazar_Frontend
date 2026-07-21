"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "../_components/LoginForm";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return <LoginForm redirectTo={redirectTo} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />}>
      <LoginPageContent />
    </Suspense>
  );
}
