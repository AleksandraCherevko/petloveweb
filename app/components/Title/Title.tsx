import React, { ReactNode } from "react";
import css from "./Title.module.css";

interface TitleProps {
  children: ReactNode;
  as?: "h2" | "h3" | "h4";
  className?: string;
}
export default function Title({
  children,
  as = "h2",
  className = "",
}: TitleProps) {
  const Tag = as;
  return <Tag className={`${css.title} ${className}`}>{children}</Tag>;
}
