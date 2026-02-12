"use client";

import { useState } from "react";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";

interface EditUserBtnProps {
  onSuccess: () => void; // функция для обновления UserCard после редактирования
}

export function EditUserBtn({ onSuccess }: EditUserBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={handleOpen}>Edit Profile</button>
      {isOpen && (
        <ModalEditUser
          onClose={handleClose}
          onSuccess={onSuccess} // передаем callback
        />
      )}
    </>
  );
}
