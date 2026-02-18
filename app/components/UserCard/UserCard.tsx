"use client";

import Loader from "../Loader/Loader";
import { useState } from "react";
import UserBlock from "../UserBlock/UserBlock";
import { EditUserBtn } from "../EditUserBtn/EditUserBtn";
import { PetsBlock } from "../PetsBlock/PetsBlock";
import { useAuthStore } from "@/app/lib/store/auth";
import css from "./UserCard.module.css";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";

export default function UserCard() {
  const { user, setUser } = useAuthStore();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const refetchUser = async () => {
    const res = await fetch("/api/users/current/full", {
      credentials: "include",
    });
    if (!res.ok) return;
    const me = await res.json();
    setUser(me);
  };

  if (!user) return <Loader progress={0} />;

  return (
    <div className={css.whiteBlock}>
      <div className={css.userBlockBtnWrap}>
        <div className={css.userBlockWrap}>
          <p className={css.userBlock}>
            User
            <svg className={css.userIconBlock} width="14" height="14">
              <use href="/symbol-defs.svg#icon-user-white"></use>
            </svg>
          </p>
        </div>
        <EditUserBtn onSuccess={refetchUser} />
      </div>
      <UserBlock
        user={user}
        onUpdate={refetchUser}
        onOpenEditAction={() => setIsEditOpen(true)}
      />

      <PetsBlock pets={user.pets || []} onPetsChanged={refetchUser} />
      {isEditOpen && (
        <ModalEditUser
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            void refetchUser();
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}
