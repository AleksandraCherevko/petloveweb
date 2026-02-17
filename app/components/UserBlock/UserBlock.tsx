"use client";

import Image from "next/image";
import { User } from "@/app/types/user";

import Link from "next/link";

interface UserBlockProps {
  user: User;
  onUpdate: () => void;
}

export default function UserBlock({ user }: UserBlockProps) {
  return (
    <div>
      {/* PHOTO*/}
      {user.avatar ? (
        <Image src={user.avatar} alt="User Avatar" width={100} height={100} />
      ) : (
        <div>
          <Link href="/profile/upload-photo">
            <svg width="24" height="24">
              <use href="/symbol-defs.svg#icon-user"></use>
            </svg>
            Upload photo
          </Link>
        </div>
      )}

      {/* USER INFO */}
      <h3>My information</h3>
      <div>
        <div>
          <input
            type="text"
            value={user.name || ""}
            placeholder="Missing name"
            readOnly
          />
        </div>
        <div>
          <input type="email" value={user.email || ""} readOnly />
        </div>
        <div>
          <input
            type="tel"
            value={user.phone || ""}
            placeholder="Missing phone number"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
