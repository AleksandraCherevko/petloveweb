"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../Modal/Modal";
import css from "./ModalAttention.module.css";
import Title from "../Title/Title";
import clsx from "clsx";

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
          <svg className={css.modalIcon} width="24" height="24">
            <use href="/symbol-defs.svg#icon-cross-black"></use>
          </svg>
        </button>
        <div className={css.imgWrap}>
          <Image
            className={css.modalImg}
            src="/images/modal/dog.png"
            width={44}
            height={44}
            alt="dog"
          />
        </div>
        <Title as="h3" className={css.attention}>
          Attention
        </Title>
        <p className={css.attentionText}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className={css.linksWrap}>
          <div className={clsx(css.linksBtn, css.linkLogin)}>
            <Link href="/login">Log in</Link>
          </div>
          <p className={clsx(css.linksBtn, css.linkRegistration)}>
            <Link href="/register">Registration</Link>
          </p>
        </div>
      </div>
    </Modal>
  );
}
