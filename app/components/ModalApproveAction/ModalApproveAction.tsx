"use client";

import css from "./ModalApproveAction.module.css";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalApproveActionProps {
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalApproveAction({
  title,
  confirmText = "Yes",
  cancelText = "Cancel",

  onConfirm,
  onCancel,
}: ModalApproveActionProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);



  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className={css.backdrop} onClick={onCancel}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onCancel}>
          <svg className={css.logoIcon} width="24" height="24">
            <use href="/symbol-defs.svg#icon-cross-black"></use>
          </svg>
        </button>

        <div className={css.modalContent}>
          <div className={css.emojiWrapp}>
            <Image
              src="/images/modal/cat.png"
              width={44}
              height={44}
              alt="cat emoji"
            />
          </div>
          <p className={css.title}>{title}</p>

          <div className={css.actions}>
            <button className={css.confirmBtn} onClick={onConfirm}>
              {confirmText}
            </button>
            <button className={css.cancelBtn} onClick={onCancel}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
