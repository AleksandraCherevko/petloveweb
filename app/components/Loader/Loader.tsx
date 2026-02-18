
"use client";

import css from "./Loader.module.css";

interface LoaderProps {
  progress?: number;
}

export default function Loader({ progress = 100}: LoaderProps) {
  return (
    <div
      className={css.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={css.loaderWrap}>
        <div className={css.spinner} />
        {typeof progress === "number" && (
          <p className={css.progress}>{progress}%</p>
        )}
      </div>
    </div>
  );
}
