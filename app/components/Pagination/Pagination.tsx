"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import css from "./Pagination.module.css";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

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
      <Link
        href={createPageURL(1)}
        className={`${css.button} ${isFirst ? css.disabled : ""}`}
        aria-disabled={isFirst}
      >
        {"<<"}
      </Link>

      {/* < */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`${css.button} ${isFirst ? css.disabled : ""}`}
        aria-disabled={isFirst}
      >
        {"<"}
      </Link>

      {/* pages */}
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className={css.dots}>
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}-${index}`}
            href={createPageURL(page)}
            className={`${css.button} ${
              page === currentPage ? css.active : ""
            }`}
          >
            {page}
          </Link>
        ),
      )}


      <Link
        href={createPageURL(currentPage + 1)}
        className={`${css.button} ${isLast ? css.disabled : ""}`}
        aria-disabled={isLast}
      >
        <svg className={css.paginationLogo} width="14" height="14">
          <use href="/symbol-defs.svg#icon-single-chevron-right"></use>
        </svg>
      </Link>

      <Link
        href={createPageURL(totalPages)}
        className={`${css.button} ${isLast ? css.disabled : ""}`}
        aria-disabled={isLast}
      >
        <svg className={css.paginationLogo} width="14" height="14">
          <use href="/symbol-defs.svg#icon-double-chevron-right"></use>
        </svg>
      </Link>
    </div>
  );
}
