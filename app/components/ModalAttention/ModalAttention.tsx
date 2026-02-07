// app/components/ModalAttention/ModalAttention.tsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../Modal/Modal";
import css from "./ModalAttention.module.css";

interface Props {
  onClose: () => void;
}

export default function ModalAttention({ onClose }: Props) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  return (
    <Modal onClose={handleClose}>
      <div className={`${css.modal} ${isClosing ? css.modalClosing : ""}`}>
        <button
          className={css.closeBtn}
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <Image src="/images/modal/dog.jpg" width={44} height={44} alt="dog" />
        <h3>Attention</h3>
        <p>
          Certain functionality is available only to authorized users. Please
          register or log in.
        </p>
        <Link href="/register">Registration</Link>
        <Link href="/login">Login</Link>
      </div>
    </Modal>
  );
}
