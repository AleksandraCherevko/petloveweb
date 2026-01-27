import css from "./Nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const navItems = [
    { href: "/news", label: "News" },
    { href: "/notices", label: "Find pet" },
    { href: "/friends", label: "Our friends" },
  ];
  return (
    <>
      <div className={css.navListContainer}>
        <ul className={css.navList}>
          {navItems.map((item) => (
            <li
              key={item.href}
              className={pathname === item.href ? css.active : ""}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
