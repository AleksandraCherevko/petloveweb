import { Notice } from "@/app/lib/api";
import Image from "next/image";
import css from "./NoticeItem.module.css";

type Props = {
  item: Notice;
};

const NoticesItem = ({ item }: Props) => {
  return (
    <li className={css.noticeItem}>
      <Image
        src={item.imgURL}
        width={287}
        height={178}
        alt={item.comment}
        className={css.noticeItemImage}
      />
      <div className={css.noticeItemTitleStarWrap}>
        <p className={css.noticeItemTitle}>{item.title}</p>
        <p className={css.noticeItemPop}>
          <svg className={css.logoIcon} width="16" height="16">
            <use href="/symbol-defs.svg#icon-star"></use>
          </svg>
          {item.popularity}
        </p>
      </div>
      <div className={css.noticeItemCategoryWrap}>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Name</span>
          {item.name}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Birthday</span>
          {item.birthday}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Sex</span> {item.sex}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Species</span>
          {item.species}
        </p>
        <p className={css.noticeItemCategory}>
          <span className={css.noticeItemCategorySpan}>Category</span>
          {item.category}
        </p>
      </div>
      <p className={css.noticeItemComment}>{item.comment}</p>
      {item.price && <p className={css.noticeItemPrice}>${item.price}</p>}
      <div className={css.noticeItemBtnWrapper}>
        <button className={css.learnMoreBtn}>Learn more</button>
        <button className={css.favoriteBtn}>
          <svg className={css.logoIcon} width="18" height="18">
            <use href="/symbol-defs.svg#icon-heart"></use>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default NoticesItem;
