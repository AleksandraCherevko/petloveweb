"use client";

import { FormEvent } from "react";
import css from "./SearchField.module.css";
import clsx from "clsx";

type Props = {
  value: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
  placeholder?: string;
  className?: string;
};

export default function SearchField({
  value,
  onChangeAction,
  onSubmitAction,
  placeholder = "Search",
  className,
}: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitAction();
  };

  const handleClear = () => {
    onChangeAction("");
  };
  return (
    <form className={clsx(css.searchForm, className)} onSubmit={handleSubmit}>
      <div className={css.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeAction(e.target.value)}
          placeholder={placeholder}
          className={css.searchInput}
        />

        {value && (
          <button
            type="button"
            className={clsx(css.clearBtn)}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg className={css.crossIcon} width="18" height="19">
              <use href="/symbol-defs.svg#icon-cross-black"></use>
            </svg>
          </button>
        )}

        <button
          type="submit"
          className={clsx(css.submitBtn)}
          aria-label="Search"
        >
          <svg className={css.searchIcon} width="18" height="19">
            <use href="/symbol-defs.svg#icon-search"></use>
          </svg>
        </button>
      </div>
    </form>
  );
}
