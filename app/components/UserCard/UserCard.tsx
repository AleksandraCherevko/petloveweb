"use client";

import { useState, useEffect } from "react";
import { EditUserBtn } from "../EditUserBtn/EditUserBtn";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";

// Тип пользователя
export type User = {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  token?: string;
};

export default function UserCard() {
  const [user, setUser] = useState<User | null>(null);

  // Загружаем данные пользователя при монтировании
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users/current");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  // Функция для обновления данных после редактирования
  async function handleUpdateUser() {
    try {
      const res = await fetch("/api/users/current/full");
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h1>UserCard</h1>

      {/* Блок информации о пользователе */}
      <div>
        <img src={user.avatar} alt="avatar" width={80} />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>

      {/* Кнопка редактирования */}
      <EditUserBtn onSuccess={handleUpdateUser} />

      {/* Здесь можно вставить PetsBlock и LogOutBtn */}
      <div>PetsBlock</div>
      <div>LogOutBtn</div>
    </div>
  );
}
