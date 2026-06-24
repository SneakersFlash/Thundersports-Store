import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | Thunder Sports",
  description: "Sign in to your Thunder Sports account to browse and shop the latest sports footwear and gear.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2F2F2]" />}>
      <LoginForm />
    </Suspense>
  );
}
