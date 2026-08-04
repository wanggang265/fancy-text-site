"use client";

import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/LoginModal";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main id="main" className="flex flex-grow items-start justify-center px-4 py-16">
      <LoginModal isOpen onClose={() => router.push("/")} />
    </main>
  );
}
