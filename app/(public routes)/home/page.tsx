import Hero from "@/app/components/Hero/Hero";
import css from "./page.module.css";


export default function Home() {
  return (
    <div className={css.homePage}>
      <Hero />
    </div>
  );
}
