import Image from "next/image";
import Link from "next/link";
import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={css.errorPage}>
      <div className={css.error}>
        <p className={css.errorNumber}>4</p>
        <div className={css.imageWrap}>
          <Image
            src="/images/error-page/404Mob.png"
            alt="Not found"
            width={109}
            height={109}
            className={css.imgMobile}
            priority
          />
          <Image
            src="/images/error-page/404Tablet.png"
            alt="Not found"
            width={280}
            height={280}
            className={css.imgTablet}
            priority
          />
          <Image
            src="/images/error-page/404Desktop.png"
            alt="Not found"
            width={280}
            height={280}
            className={css.imgDesktop}
            priority
          />
        </div>
        <p className={css.errorNumber}>4</p>
      </div>
      <p className={css.errorText}>Ooops! This page not found :(</p>
      <div className={css.linkWrap}>
        <Link href="/home" className={css.link}>
          To home page
        </Link>
      </div>
    </main>
  );
}
