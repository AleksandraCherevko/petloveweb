// "use client";
// import css from "./UserCard.module.css";
// import { useAuthStore } from "@/app/lib/store/auth";
// import { useRouter } from "next/navigation";
// import { logout } from "@/app/lib/api";


// interface UserCardProps {
//   className?: string;
//   onClose?: () => void;
//   isHome?: boolean;
// }

// export default function UserCard({}: UserCardProps) {
//   const router = useRouter();

//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated,
//   );
//   // if (!isAuthenticated) return null;

//   const handleLogout = async () => {
//     // Викликаємо logout
//     await logout();
//     // Чистимо глобальний стан
//     clearIsAuthenticated();
//     // Виконуємо навігацію на сторінку авторизації
//     router.push("/login");
//   };
//   return (
//     <ul className={css.userNavList}>
//       <li>
      
//         <button onClick={handleLogout}>Logout</button>
//       </li>
//     </ul>
//   );
// }
