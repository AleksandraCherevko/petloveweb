import css from "./PetBlock.module.css";
import Image from "next/image";

type PetBlockImgProps = {
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
  alt: string;
  priority?: boolean;
};
const PetBlock = ({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  priority = false,
}: PetBlockImgProps) => {
  return (
    <div className={css.wrapper}>
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        priority={priority}
        className={`${css.image} ${css.mobile}`}
        sizes="(max-width: 767px) 100vw"
      />
      <Image
        src={tabletSrc}
        alt={alt}
        fill
        priority={priority}
        className={`${css.image} ${css.tablet}`}
        sizes="(min-width: 768px) and (max-width: 1279px) 100vw"
      />
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority={priority}
        className={`${css.image} ${css.desktop}`}
        sizes="(min-width: 1280px) 100vw"
      />
    </div>
  );
};

export default PetBlock;
