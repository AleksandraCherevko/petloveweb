import css from "./Hero.module.css";
import Container from "../Container/Container";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.heroTitleContainer}>
          <h1 className={css.heroTitle}>
            Take good <span className={css.spanCare}>care</span> of your small
            pets
          </h1>
          <p className={css.heroAfterTitle}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
        <div className={css.heroImgContainer}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/hero/hero-mob.jpg"
            />
            <source
              media="(max-width: 1279px)"
              srcSet="/images/hero/hero-tablet.jpg"
            />
            <Image
              src="/images/hero/hero-desktop.jpg"
              alt="girl with a dog"
              fill
              priority
              className={css.heroImage}
            />
          </picture>
        </div>
      </Container>
    </section>
  );
}
