import clsx from "clsx";
import Image from "next/image";
import css from "./PetBlock.module.css";

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
      <Image
        src={mobileSrc}
        alt={alt}
        width={335}
        height={213}
        priority
        className={clsx(css.image, css.mobile)}
      />
      <Image
        src={tabletSrc}
        alt={alt}
        width={704}
        height={248}
        priority
        className={clsx(css.image, css.tablet)}
      />
      <Image
        src={desktopSrc}
        alt={alt}
        width={592}
        height={654}
        priority
        className={clsx(css.image, css.desktop)}
      />
    </div>
  );
};

export default PetBlock;
