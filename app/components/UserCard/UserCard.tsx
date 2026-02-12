"use client";

import { useState, useEffect } from "react";

import Loader from "../Loader/Loader";
import UserBlock from "../UserBlock/UserBlock";

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
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await fetch("/api/users/current");
  //       if (!res.ok) throw new Error("Failed to fetch user");
  //       const data = await res.json();
  //       setUser(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchUser();
  // }, []);
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users/current/full");
      if (!res.ok) throw new Error("Failed to fetch user");
      const data: User = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
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

      {/* Блок питомцев */}
      <div>PetsBlock</div>

     
    </div>
  );
}
