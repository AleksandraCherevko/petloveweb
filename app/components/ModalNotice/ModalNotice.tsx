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
          ✕
        </button>

        <Image
          src={notice.imgURL}
          width={335}
          height={190}
          alt={notice.comment}
          className={css.image}
        />

        <h3 className={css.title}>{notice.title}</h3>
        <p className={css.popularity}>{notice.popularity}</p>

        <div className={css.meta}>
          <p>
            <span>Name</span>
            {notice.name}
          </p>
          <p>
            <span>Birthday</span>
            {notice.birthday}
          </p>
          <p>
            <span>Sex</span>
            {notice.sex}
          </p>
          <p>
            <span>Species</span>
            {notice.species}
          </p>
          <p>
            <span>Category</span>
            {notice.category}
          </p>
        </div>

        <p className={css.comment}>{notice.comment}</p>
        {notice.price && <p className={css.price}>${notice.price}</p>}

        <div className={css.actions}>
          <button
            type="button"
            onClick={toggleFavorite}
            disabled={loading}
            className={css.favoriteBtn}
          >
            {isFavorite ? "Remove from" : "Add to"}
          </button>

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
  );
}
