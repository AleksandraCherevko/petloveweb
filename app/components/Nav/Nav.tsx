import css from "./Nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/app/lib/store/auth";

export default function Nav({ isHome }: { isHome?: boolean }) {
  const pathname = usePathname();
  const navItems = [
    { href: "/news", label: "News" },
    { href: "/notices", label: "Find pet" },
    { href: "/friends", label: "Our friends" },
  ];

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <div className={css.navListContainer}>
        <ul className={clsx(css.navList, isHome && css.navListHome)}>
          {navItems.map((item) => (
            <li
              key={item.href}
              className={clsx(
                css.navListItem,
                isHome && css.navListItemHome,
                pathname === item.href && css.active,
                isAuthenticated && css.navListItemMob,
                isAuthenticated && css.navListItemAuth,
              )}
            >
              <Link
                href={item.href}
                className={clsx(
                  css.navListIink,
                  isHome && css.navListLinkHome,
                  isAuthenticated && css.navListItemMobLink,
                  isAuthenticated && css.navListLinkAuth,
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
