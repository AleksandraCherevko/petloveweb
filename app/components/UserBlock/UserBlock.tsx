"use client";

import Image from "next/image";
import { User } from "../UserCard/UserCard";
import { EditUserBtn } from "../EditUserBtn/EditUserBtn";
import UserBarIcon from "../UserBarIcon/UserBarIcon";
import Link from "next/link";

interface UserBlockProps {
  user: User;
  onUpdate: () => void;
}

export default function UserBlock({ user, onUpdate }: UserBlockProps) {
  return (
    <div>
      {/* Аватар или UserBarIcon + Upload photo */}
      {user.avatar ? (
        <Image src={user.avatar} alt="User Avatar" width={100} height={100} />
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <UserBarIcon />
          <Link href="/profile/upload-photo">Upload photo</Link>
        </div>
      )}
      <EditUserBtn onSuccess={onUpdate} />
      {/* Информация о пользователе */}
      <h3>My information</h3>
      <p>Name: {user.name || "No name"}</p>
      <p>Email: {user.email}</p>
      <p>PLihone: {user.phone || "No phone"}</p>
    </div>
  );
}
