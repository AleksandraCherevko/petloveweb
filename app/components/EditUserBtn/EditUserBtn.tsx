"use client";

import { useState } from "react";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";
import css from "./EditUserBtn.module.css";

interface EditUserBtnProps {
  onSuccess: () => void;
}

export function EditUserBtn({ onSuccess }: EditUserBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={css.editUserBtn}>
        <svg className={css.logoIcon} width="18" height="18">
          <use href="/symbol-defs.svg#icon-edit"></use>
        </svg>
      </button>
      {isOpen && (
        <ModalEditUser
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
