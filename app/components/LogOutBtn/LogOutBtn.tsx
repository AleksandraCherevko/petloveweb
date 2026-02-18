"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/app/lib/store/auth";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import css from "./LogOutBtn.module.css";
import clsx from "clsx";

interface logOutProps {
  className?: string;
}
const logout = async () => {
  const res = await fetch("/api/users/signout", { method: "POST" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || "Failed to logout");
  }
  return res.json();
};

export default function LogOutBtn({ className = "" }: logOutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      clearIsAuthenticated();
      localStorage.clear();
      router.push("/home");
    }
  };

  return (
    <>
      <button
        className={clsx(css.logoutBtn, className)}
        onClick={() => setIsOpen(true)}
      >
        Log out
      </button>

      {isOpen && (
        <ModalApproveAction
          title="Already leaving?"
          confirmText="Yes"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
