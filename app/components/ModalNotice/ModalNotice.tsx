"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import css from "./ModalNotice.module.css";
import {
  NoticeDetails,
  addNoticeToFavorites,
  removeNoticeFromFavorites,
  isUnauthorizedError,
} from "@/app/lib/api";
import Title from "../Title/Title";
import clsx from "clsx";

type Props = {
  notice: NoticeDetails;
  isFavorite: boolean;
  onFavoriteChangeAction: (next: boolean) => void;
  onUnauthorizedAction: () => void;
  onCloseAction: () => void;
};

export default function ModalNotice({
  notice,
  isFavorite,
  onFavoriteChangeAction,
  onUnauthorizedAction,
  onCloseAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const noticeId = notice._id;

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onCloseAction();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onCloseAction]);

  const contactHref = useMemo(() => {
    const phone = notice.phone ?? notice.owner?.phone ?? notice.user?.phone;
    const email = notice.email ?? notice.owner?.email ?? notice.user?.email;
    if (phone) return `tel:${phone}`;
    if (email) return `mailto:${email}`;
    return "";
  }, [notice]);

  const toggleFavorite = async () => {
    if (!noticeId) return;
    try {
      setLoading(true);
      if (isFavorite) {
        await removeNoticeFromFavorites(noticeId);
        onFavoriteChangeAction(false);
      } else {
        await addNoticeToFavorites(noticeId);
        onFavoriteChangeAction(true);
      }
    } catch (error) {
      if (isUnauthorizedError(error)) {
        onUnauthorizedAction();
        return;
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onCloseAction()}
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onCloseAction}
          aria-label="Close"
        >
          <svg className={css.closeBtnIcon} width="24" height="24">
            <use href="/symbol-defs.svg#icon-cross-black"></use>
          </svg>
        </button>

        <div className={css.imageWrap}>
          <Image
            src={notice.imgURL}
            width={335}
            height={190}
            alt={notice.comment}
            className={css.image}
          />
        </div>
        <Title as="h3" className={css.title}>
          {notice.title}
        </Title>
        <p className={css.popularity}>
          <svg width="16" height="16">
            <use href="/symbol-defs.svg#icon-star" />
          </svg>
          <svg width="16" height="16">
            <use href="/symbol-defs.svg#icon-star" />
          </svg>
          <svg width="16" height="16">
            <use href="/symbol-defs.svg#icon-star" />
          </svg>
          <svg width="16" height="16">
            <use href="/symbol-defs.svg#icon-star" />
          </svg>
          <svg width="16" height="16">
            <use href="/symbol-defs.svg#icon-star" />
          </svg>
          {notice.popularity}
        </p>

        <div className={css.petInfoWrap}>
          <p className={css.petInfo}>
            <span className={css.petInfoSpan}>Name</span>
            {notice.name}
          </p>
          <p className={css.petInfo}>
            <span className={css.petInfoSpan}>Birthday</span>
            {notice.birthday}
          </p>
          <p className={css.petInfo}>
            <span className={css.petInfoSpan}>Sex</span>
            {notice.sex}
          </p>
          <p className={css.petInfo}>
            <span className={css.petInfoSpan}>Species</span>
            {notice.species}
          </p>
        </div>

        <p className={css.comment}>{notice.comment}</p>
        {notice.price && <p className={css.price}>${notice.price}</p>}

        <div className={css.actions}>
          <div className={css.contactBtnWrapFavorite}>
            <button
              type="button"
              onClick={toggleFavorite}
              disabled={loading}
              className={clsx(css.contactBtnWrap, css.favoriteBtn)}
            >
              {isFavorite ? "Remove from" : "Add to"}
              <svg className={css.contactBtnIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-heart-white"></use>
              </svg>
            </button>
          </div>

          <div className={clsx(css.contactBtnWrap, css.contactBtnWrapContact)}>
            {contactHref ? (
              <a href={contactHref} className={css.contactBtn}>
                Contact
              </a>
            ) : (
              <button type="button" className={css.contactBtn} disabled>
                Contact
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
