"use client";

import { useState, FormEvent } from "react";
import css from "./SearchField.module.css";
import clsx from "clsx";

type Props = {
  value: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
  placeholder?: string;
};

export default function SearchField({
  value,
  onChangeAction,
  onSubmitAction,
  placeholder = "Search...",
}: Props) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChangeAction(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitAction();
  };

  const handleClear = () => {
    setInputValue("");
    onChangeAction("");
    onSubmitAction();
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <div className={css.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={css.searchInput}
        />

        {inputValue && (
          <button
            type="button"
            className={clsx(css.clearBtn)}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        <button type="submit" className={clsx(css.submitBtn)} aria-label="Search">
          🔍
        </button>
      </div>
    </form>
  );
}
