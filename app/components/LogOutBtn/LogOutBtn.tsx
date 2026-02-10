"use client";

import { logout } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store/auth";
import { useRouter } from "next/navigation";

interface LogOutBtnProps {
  onLogoutAction?: () => void;
}

export default function LogOutBtn({ onLogoutAction }: LogOutBtnProps) {
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuthenticated();
      onLogoutAction?.();
      router.push("/login");
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
}
