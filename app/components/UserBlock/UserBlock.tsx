"use client";

import Image from "next/image";
import { User } from "@/app/types/user";
import css from "./UserBlock.module.css";
import Title from "../Title/Title";

interface UserBlockProps {
  user: User;
  onUpdate: () => void;
  onOpenEditAction: () => void;
}

export default function UserBlock({ user, onOpenEditAction }: UserBlockProps) {
  return (
    <div>
      {/* PHOTO*/}
      <div className={css.userPhoto}>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={94}
            height={94}
            className={css.avatar}
          />
        ) : (
          <button
            type="button"
            onClick={onOpenEditAction}
            className={css.uploadBtn}
          >
            <div className={css.uploadBtnIcon}>
              <svg width="40" height="40" className={css.imagePreviewIcon}>
                <use href="/symbol-defs.svg#icon-user" />
              </svg>
            </div>
            Upload photo
          </button>
        )}
      </div>

      {/* USER INFO */}
      <Title as="h3" className={css.formTitle}>
        My information
      </Title>
      <div className={css.inputWrap}>
        <div className={css.errorWrap}>
          <input
            className={css.input}
            type="text"
            value={user.name || ""}
            placeholder="Name"
            readOnly
          />
        </div>
        <div className={css.errorWrap}>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            placeholder="name@gmail.com"
            className={css.input}
          />
        </div>
        <div className={css.errorWrap}>
          <input
            type="tel"
            className={css.input}
            value={user.phone || ""}
            placeholder="+380"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
