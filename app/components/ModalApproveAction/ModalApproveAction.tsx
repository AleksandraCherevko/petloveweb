"use client";

import { useEffect } from "react";
import css from "./ModalApproveAction.module.css";

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

  return (
    <div className={css.backdrop} onClick={onCancel}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onCancel}>
          ✕
        </button>

        <p className={css.title}>{title}</p>

        <div className={css.actions}>
          <button className={css.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={css.confirmBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
