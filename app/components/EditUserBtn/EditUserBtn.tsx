"use client";

import { useState } from "react";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";
import css from "./EditUserBtn.module.css";
import { useAuthStore } from "@/app/lib/store/auth";

interface EditUserBtnProps {
  onSuccess: () => void;
}

export function EditUserBtn({ onSuccess }: EditUserBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={css.editUserBtn}>
        <svg className={css.logoIcon} width="18" height="18">
          <use href="/symbol-defs.svg#icon-edit"></use>
        </svg>
      </button>
      {isOpen && user &&(
        <ModalEditUser
          user={user}
          onClose={() => setIsOpen(false)}
          onSuccess={() => {
            onSuccess();
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}
