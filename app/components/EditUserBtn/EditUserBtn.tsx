"use client";

import { useState } from "react";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";

interface EditUserBtnProps {
  onSuccess: () => void;
}

export function EditUserBtn({ onSuccess }: EditUserBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit User</button>
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
