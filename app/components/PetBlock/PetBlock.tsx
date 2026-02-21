"use client";
import clsx from "clsx";
import css from "./PetBlock.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

type PetBlockImgProps = {
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
  alt: string;
  className?: string;
};

const PetBlock = ({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  className,
}: PetBlockImgProps) => {
  const [src, setSrc] = useState(mobileSrc);

  useEffect(() => {
    const setByWidth = () => {
      const w = window.innerWidth;
      if (w >= 1280) setSrc(desktopSrc);
      else if (w >= 768) setSrc(tabletSrc);
      else setSrc(mobileSrc);
    };

    setByWidth();
    window.addEventListener("resize", setByWidth);
    return () => window.removeEventListener("resize", setByWidth);
  }, [mobileSrc, tabletSrc, desktopSrc]);
  return (
    <div className={clsx(css.wrapper, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 704px, 592px"
        className={css.image}
      />
    </div>
  );
};

export default PetBlock;
