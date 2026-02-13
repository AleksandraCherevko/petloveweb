"use client";

import { useState, useEffect } from "react";

import Loader from "../Loader/Loader";
import UserBlock from "../UserBlock/UserBlock";
import { EditUserBtn } from "../EditUserBtn/EditUserBtn";

export type User = {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
};

export default function UserCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // <-- вот здесь
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data: User = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loader progress={0} />;
  if (!user) return <p>Failed to load user</p>;

  if (!user) return <Loader progress={0} />;

  return (
    <div>
      <h1>UserCard</h1>

      {/* Аватар или кнопка редактирования */}

      {/* Блок информации о пользователе */}
      <UserBlock user={user} onUpdate={fetchUser} />
      <EditUserBtn
        onSuccess={() => {
          fetchUser();
        }}
      />
      {/* Блок питомцев */}
      <div>PetsBlock</div>
    </div>
  );
}
