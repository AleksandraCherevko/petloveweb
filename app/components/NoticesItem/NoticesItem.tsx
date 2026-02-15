// "use client";

// import { Notice } from "@/app/lib/api";
// import Image from "next/image";
// import css from "./NoticeItem.module.css";
// import { useState } from "react";
// import ModalAttention from "../ModalAttention/ModalAttention";

// type NoticesItemProps = {
//   notice: Notice;
//   removable?: boolean; // показать иконку удаления
//   onRemove?: () => void;
// };

// const NoticesItem = ({ notice, removable, onRemove }: NoticesItemProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <li className={css.noticeItem}>
//       <Image
//         src={notice.imgURL}
//         width={287}
//         height={178}
//         alt={notice.comment}
//         className={css.noticeItemImage}
//       />
//       <div className={css.noticeItemTitleStarWrap}>
//         <p className={css.noticeItemTitle}>{notice.title}</p>
//         <p className={css.noticeItemPop}>
//           <svg className={css.logoIcon} width="16" height="16">
//             <use href="/symbol-defs.svg#icon-star"></use>
//           </svg>
//           {notice.popularity}
//         </p>
//       </div>
//       <div className={css.noticeItemCategoryWrap}>
//         <p className={css.noticeItemCategory}>
//           <span className={css.noticeItemCategorySpan}>Name</span>
//           {notice.name}
//         </p>
//         <p className={css.noticeItemCategory}>
//           <span className={css.noticeItemCategorySpan}>Birthday</span>
//           {notice.birthday}
//         </p>
//         <p className={css.noticeItemCategory}>
//           <span className={css.noticeItemCategorySpan}>Sex</span> {notice.sex}
//         </p>
//         <p className={css.noticeItemCategory}>
//           <span className={css.noticeItemCategorySpan}>Species</span>
//           {notice.species}
//         </p>
//         <p className={css.noticeItemCategory}>
//           <span className={css.noticeItemCategorySpan}>Category</span>
//           {notice.category}
//         </p>
//       </div>
//       <p className={css.noticeItemComment}>{notice.comment}</p>
//       {notice.price && <p className={css.noticeItemPrice}>${notice.price}</p>}
//       <div className={css.noticeItemBtnWrapper}>
//         <button
//           className={css.learnMoreBtn}
//           onClick={() => setIsModalOpen(true)}
//         >
//           Learn more
//         </button>
//         <button
//           className={css.favoriteBtn}
//           onClick={() => setIsModalOpen(true)}
//         >
//           <svg className={css.logoIcon} width="18" height="18">
//             <use href="/symbol-defs.svg#icon-heart"></use>
//           </svg>
//         </button>
//       </div>
//       {isModalOpen && <ModalAttention onClose={() => setIsModalOpen(false)} />}
//       {removable && onRemove && (
//         <button onClick={onRemove} style={{ marginLeft: "auto" }}>
//           🗑️
//         </button>
//       )}
//     </li>
//   );
// };

// export default NoticesItem;

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
  isUnauthorizedError,
} from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/store/auth";

type NoticesItemProps = {
  notice: Notice;
  removable?: boolean;
  onRemove?: () => void;
};

type NoticeWithMeta = Notice & { isFavorite?: boolean; id?: string };

const NoticesItem = ({ notice, removable, onRemove }: NoticesItemProps) => {
  const { isAuthenticated } = useAuthStore();
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [details, setDetails] = useState<NoticeDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(
    Boolean((notice as NoticeWithMeta).isFavorite),
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  const noticeId = (notice as NoticeWithMeta).id ?? notice._id;

  const handleLearnMore = async () => {
    if (!isAuthenticated) {
      setIsAttentionOpen(true);
      return;
    }

    try {
      setIsLoadingDetails(true);
      const full = await getNoticeById(noticeId);
      setDetails(full);
      setIsNoticeOpen(true);
    } catch (error) {
      if (isUnauthorizedError(error)) {
        setIsAttentionOpen(true);
        return;
      }
      console.error(error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

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
      } else {
        await addNoticeToFavorites(noticeId);
        setIsFavorite(true);
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
    <li className={css.noticeItem}>
      <Image
        src={notice.imgURL}
        width={287}
        height={178}
        alt={notice.comment}
        className={css.noticeItemImage}
      />

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
          {notice.birthday}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Sex</span>
          {notice.sex}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Species</span>
          {notice.species}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Category</span>
          {notice.category}
        </p>
      </div>

      <p className={css.noticeItemComment}>{notice.comment}</p>
      {notice.price && <p className={css.noticeItemPrice}>${notice.price}</p>}

      <div className={css.noticeItemBtnWrapper}>
        <button
          className={css.learnMoreBtn}
          onClick={handleLearnMore}
          disabled={isLoadingDetails}
        >
          {isLoadingDetails ? "Loading..." : "Learn more"}
        </button>

        <button
          className={`${css.favoriteBtn} ${isFavorite ? css.favoriteBtnActive : ""}`}
          onClick={handleFavorite}
          disabled={isLoadingFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg className={css.logoIcon} width="18" height="18">
            <use href="/symbol-defs.svg#icon-heart" />
          </svg>
        </button>
      </div>

      {isAttentionOpen && (
        <ModalAttention onClose={() => setIsAttentionOpen(false)} />
      )}

      {isNoticeOpen && details && (
        <ModalNotice
          notice={details}
          isFavorite={isFavorite}
          onFavoriteChangeAction={setIsFavorite}
          onUnauthorizedAction={() => {
            setIsNoticeOpen(false);
            setIsAttentionOpen(true);
          }}
          onCloseAction={() => setIsNoticeOpen(false)}
        />
      )}

      {removable && onRemove && (
        <button onClick={onRemove} style={{ marginLeft: "auto" }}>
          🗑️
        </button>
      )}
    </li>
  );
};

export default NoticesItem;
