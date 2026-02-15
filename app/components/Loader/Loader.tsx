// // Loader.tsx
// import React from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// interface LoaderProps {
//   progress?: number;
// }

// const Loader: React.FC<LoaderProps> = ({ progress = 100 }) => {
//   return (
//     <div style={styles.overlay}>
//       <div style={styles.loader}>
//         <CircularProgressbar
//           value={progress}
//           text={`${progress}%`}
//           strokeWidth={0.5}
//           styles={buildStyles({
//             pathColor: "#80808050",
//             trailColor: "#FFFFFF00",
//             textColor: "#80808050",
//             strokeLinecap: "round",
//             textSize: "10px",
//           })}
//         />
//       </div>
//     </div>
//   );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(128, 128, 128, 0.1)",
//     zIndex: 9999,
//   },
//   loader: {
//     width: "clamp(220px, 60vw, 396px)",
//     height: "clamp(220px, 60vw, 396px)",
//     fontFamily: "Manrope, sans-serif",
//     fontWeight: 500,

//     letterSpacing: "-0.04em",
//   },
// };

// export default Loader;

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
