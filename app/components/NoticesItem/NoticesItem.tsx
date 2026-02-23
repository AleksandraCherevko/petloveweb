"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./NoticeItem.module.css";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";
import {
  Notice,
  NoticeDetails,
  addNoticeToFavorites,
  removeNoticeFromFavorites,
  getNoticeById,
  getUser,
  isUnauthorizedError,
} from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store/auth";
import clsx from "clsx";

import FirstFavoriteModal from "../FirstFavoriteModal/FirstFavoriteModal";

type NoticesItemProps = {
  notice: Notice;
  removable?: boolean;
  onRemove?: () => void;
  onFavoriteChangeAction?: (id: string, isFavorite: boolean) => void;
  onViewedChangeAction?: () => void;
  className?: string;
};

type NoticeWithMeta = Notice & {
  id?: string;
  _id: string;
  isFavorite?: boolean;
};

const NoticesItem = ({
  notice,
  removable,
  onRemove,
  onFavoriteChangeAction,
  className,
}: NoticesItemProps) => {
  const { isAuthenticated } = useAuthStore();
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [details, setDetails] = useState<NoticeDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(
    removable ? true : Boolean((notice as NoticeWithMeta).isFavorite),
  );

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const [isFirstFavoriteOpen, setIsFirstFavoriteOpen] = useState(false);
  const [pendingFavoriteSync, setPendingFavoriteSync] = useState(false);

  const rawId =
    (notice as { _id?: string; id?: string; noticeId?: string })._id ??
    (notice as { _id?: string; id?: string; noticeId?: string }).id ??
    (notice as { _id?: string; id?: string; noticeId?: string }).noticeId;

  const noticeId = typeof rawId === "string" && rawId.trim() ? rawId : null;

  if (!noticeId) {
    return null;
  }

  const handleLearnMore = async () => {
    if (!noticeId) return;

    // 1) открываем модалку сразу с базовыми данными карточки
    setDetails({
      ...(notice as NoticeDetails),
      _id: noticeId,
      isFavorite,
    });
    setIsNoticeOpen(true);

    // 2) пробуем догрузить full details
    try {
      setIsLoadingDetails(true);
      const full = await getNoticeById(noticeId);
      setDetails(full);
    } catch (error) {
      if (isUnauthorizedError(error)) {
        setIsNoticeOpen(false);
        setIsAttentionOpen(true);
        return;
      }
      console.error("getNoticeById error:", error);
      // модалка уже открыта с базовыми данными
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // const handleLearnMore = async () => {
  //   if (!isAuthenticated) {
  //     setIsAttentionOpen(true);
  //     return;
  //   }

  //   try {
  //     setIsLoadingDetails(true);
  //     const full = await getNoticeById(noticeId);
  //     setDetails(full);
  //     setIsNoticeOpen(true);
  //     onViewedChangeAction?.();
  //   } catch (error) {
  //     if (isUnauthorizedError(error)) {
  //       setIsAttentionOpen(true);
  //       return;
  //     }
  //     console.error(error);
  //   } finally {
  //     setIsLoadingDetails(false);
  //   }
  // };

  // const handleFavorite = async () => {
  //   if (!isAuthenticated) {
  //     setIsAttentionOpen(true);
  //     return;
  //   }

  //   try {
  //     setIsLoadingFavorite(true);

  //     if (isFavorite) {
  //       await removeNoticeFromFavorites(noticeId);
  //       setIsFavorite(false);
  //       onFavoriteChangeAction?.(noticeId, false);
  //     } else {
  //       await addNoticeToFavorites(noticeId);

  //       setIsFavorite(true);
  //       onFavoriteChangeAction?.(noticeId, true);

  //       const storageKey = "first-favorite-modal-shown";
  //       const alreadyShown =
  //         typeof window !== "undefined" &&
  //         localStorage.getItem(storageKey) === "1";

  //       if (!removable && !alreadyShown) {
  //         setIsFirstFavoriteOpen(true);
  //         localStorage.setItem(storageKey, "1");
  //       }
  //     }
  //   } catch (error) {
  //     if (isUnauthorizedError(error)) {
  //       setIsAttentionOpen(true);
  //       return;
  //     }
  //     console.error(error);
  //   } finally {
  //     setIsLoadingFavorite(false);
  //   }
  // };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      setIsAttentionOpen(true);
      return;
    }

    try {
      setIsLoadingFavorite(true);

      if (isFavorite) {
        await removeNoticeFromFavorites(noticeId);
        setIsFavorite(false);
        onFavoriteChangeAction?.(noticeId, false);
        return;
      }

      await addNoticeToFavorites(noticeId);
      setIsFavorite(true);
      onFavoriteChangeAction?.(noticeId, true);

      // Показать модалку, если это первая карточка в избранном
      try {
        const me = await getUser();
        if ((me.noticesFavorites?.length ?? 0) === 1) {
          setIsFirstFavoriteOpen(true);
        }
      } catch {
        // ignore
      }
    } catch (error) {
      if (isUnauthorizedError(error)) {
        setIsAttentionOpen(true);
        return;
      }
      console.error(error);
    } finally {
      setIsLoadingFavorite(false);
    }
  };

  return (
    <li className={clsx(css.noticeItem, className)}>
      <div className={css.noticeItemImageWrap}>
        <Image
          src={notice.imgURL}
          fill
          sizes="(max-width: 767px) 287px, (max-width: 1279px) 294px, 315px"
          alt={notice.comment}
          className={css.noticeItemImage}
        />
      </div>

      <div className={css.noticeItemTitleStarWrap}>
        <p className={css.noticeItemTitle}>{notice.title}</p>
        <p className={css.noticeItemPop}>
          <svg className={css.logoIcon} width="16" height="16">
            <use href="/symbol-defs.svg#icon-star" />
          </svg>
          {notice.popularity}
        </p>
      </div>

      <div className={css.noticeItemCategoryWrap}>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Name</span>
          {notice.name}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Birthday</span>
          <span className={css.noticeItemCategoryValue}>{notice.birthday}</span>
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Sex</span>
          <span className={css.noticeItemCategoryValue}>{notice.sex}</span>
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Species</span>
          <span className={css.noticeItemCategoryValue}>{notice.species}</span>
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Category</span>
          <span className={css.noticeItemCategoryValue}>{notice.category}</span>
        </p>
      </div>

      <p className={css.noticeItemComment}>{notice.comment}</p>

      {notice.price ? (
        <p className={css.noticeItemPrice}>${notice.price}</p>
      ) : (
        <div className={css.noticeItemPriceEmpty} />
      )}

      <div className={css.noticeItemBtnWrapper}>
        <button
          className={css.learnMoreBtn}
          onClick={handleLearnMore}
          disabled={isLoadingDetails}
        >
          {isLoadingDetails ? "Loading..." : "Learn more"}
        </button>

        {removable ? (
          <button
            className={css.favoriteBtn}
            onClick={onRemove}
            aria-label="Remove from favorites"
            type="button"
          >
            <svg className={css.logoIcon} width="18" height="18">
              <use href="/symbol-defs.svg#icon-trash" />
            </svg>
          </button>
        ) : (
          <button
            className={`${css.favoriteBtn} ${isFavorite ? css.favoriteBtnActive : ""}`}
            onClick={handleFavorite}
            disabled={isLoadingFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            type="button"
          >
            <svg className={css.logoIcon} width="18" height="18">
              <use href="/symbol-defs.svg#icon-heart" />
            </svg>
          </button>
        )}
      </div>

      {isAttentionOpen && (
        <ModalAttention onClose={() => setIsAttentionOpen(false)} />
      )}
      {isFirstFavoriteOpen && (
        <FirstFavoriteModal
          onCloseAction={() => {
            setIsFirstFavoriteOpen(false);
            if (pendingFavoriteSync) {
              onFavoriteChangeAction?.(noticeId, true);
              setPendingFavoriteSync(false);
            }
          }}
        />
      )}

      {isNoticeOpen && details && (
        <ModalNotice
          notice={details}
          isFavorite={isFavorite}
          onFavoriteChangeAction={(next) => {
            setIsFavorite(next);
            onFavoriteChangeAction?.(noticeId, next);
          }}
          onUnauthorizedAction={() => {
            setIsNoticeOpen(false);
            setIsAttentionOpen(true);
          }}
          onCloseAction={() => setIsNoticeOpen(false)}
        />
      )}
    </li>
  );
};

export default NoticesItem;
