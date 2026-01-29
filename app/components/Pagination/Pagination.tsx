"use client";

import css from "./Pagination.module.css";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
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

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className={css.paginationContainer}>
      {/* << */}
      <button onClick={() => onPageChange(1)} disabled={isFirst}>
        {"<<"}
      </button>

      {/* < */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={isFirst}>
        {"<"}
      </button>

      {/* pages */}
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? css.active : ""}
          >
            {page}
          </button>
        ),
      )}

      {/* > */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={isLast}>
        {">"}
      </button>

      {/* >> */}
      <button onClick={() => onPageChange(totalPages)} disabled={isLast}>
        {">>"}
      </button>
    </div>
  );
}
