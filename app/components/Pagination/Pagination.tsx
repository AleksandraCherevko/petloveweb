"use client";

import css from "./Pagination.module.css";
import clsx from "clsx";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChangeAction: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChangeAction,
}: Props) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push("...");

    return pages;
  };

  return (
    <div className={css.paginationContainer}>
      <div className={css.paginationBtnWrapper}>
        <button
          className={css.paginationBtn}
          onClick={() => onPageChangeAction(1)}
          disabled={isFirst}
        >
          <span> {"<<"}</span>
        </button>

        <button
          className={css.paginationBtn}
          onClick={() => onPageChangeAction(currentPage - 1)}
          disabled={isFirst}
        >
          <span className={css.paginationIcon}> {"<"}</span>
        </button>
      </div>

      <div className={css.paginationPagesCount}>
        {getPages().map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className={css.dots}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChangeAction(page)}
              className={clsx(css.paginationBtn, {
                [css.active]: page === currentPage,
              })}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <div className={css.paginationBtnWrapper}>
        <button
          className={css.paginationBtn}
          onClick={() => onPageChangeAction(currentPage + 1)}
          disabled={isLast}
        >
          <span> {">"}</span>
        </button>

        <button
          className={css.paginationBtn}
          onClick={() => onPageChangeAction(totalPages)}
          disabled={isLast}
        >
          <span> {">>"}</span>
        </button>
      </div>
    </div>
  );
}
