"use client";

import Modal from "../Modal/Modal";
import css from "./FirstFavoriteModal.module.css";
import Image from "next/image";
import Title from "../Title/Title";
import Link from "next/link";
import clsx from "clsx";
import { useState, useCallback } from "react";

type Props = {
  onCloseAction: () => void;
};

export default function FirstFavoriteModal({ onCloseAction }: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onCloseAction(), 200);
  }, [onCloseAction]);

  return (
    <Modal onClose={onCloseAction}>
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
            src="/images/modal/cat.png"
            width={44}
            height={44}
            alt="cat emoji"
          />
        </div>
        <Title as="h3" className={css.attention}>
          Congrats
        </Title>
        <p className={css.attentionText}>
          The first fluff in the favorites! May your friendship be the happiest
          and filled with fun.
        </p>
        <div className={css.linksWrap}>
          <div className={clsx(css.linksBtn, css.linkLogin)}>
            <Link href="/profile" onClick={onCloseAction}>
              Go to profile
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
