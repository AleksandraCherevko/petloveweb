"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/app/lib/store/auth";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import css from "./LogOutBtn.module.css";

// Функция logout — делает запрос на backend
const logout = async () => {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || "Failed to logout");
  }
  return res.json();
};

export default function LogOutBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Берём метод для очистки состояния auth
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    try {
      await logout(); // Запрос на backend
      toast.success("Logged out successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      // Очистка состояния и переход на главную
      clearIsAuthenticated();
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <>
      <button className={css.logoutBtn} onClick={() => setIsOpen(true)}>
        Log out
      </button>

      {isOpen && (
        <ModalApproveAction
          title="Are you sure you want to log out?"
          confirmText="Yes"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
