import clsx from "clsx";
import css from "./PetBlock.module.css";
import Image from "next/image";

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
  return (
    <div className={clsx(css.wrapper, className)}>
      <picture>
        <source media="(min-width: 1280px)" srcSet={desktopSrc} />
        <source media="(min-width: 768px)" srcSet={tabletSrc} />
        <Image
          src={mobileSrc}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw"
          className={css.heroImage}
        />
      </picture>
    </div>
  );
};

export default PetBlock;
