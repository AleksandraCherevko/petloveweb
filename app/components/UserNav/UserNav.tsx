import css from "./UserNav.module.css";
import { useAuthStore } from "@/app/lib/store/authStore";

interface UserNavProps {
  className?: string;
  onClose?: () => void;
  isHome?: boolean;
}

export default function UserNav({}: UserNavProps) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return null;
  return (
    <ul className={css.userNavList}>
      <li>
        <p>UserBar</p>
        <button>LogOutBtn</button>
      </li>
    </ul>
  );
}
