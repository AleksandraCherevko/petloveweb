// "use client";

// // import { useState, useEffect } from "react";
// import Loader from "../Loader/Loader";
// import UserBlock from "../UserBlock/UserBlock";
// import { EditUserBtn } from "../EditUserBtn/EditUserBtn";
// import { PetsBlock } from "../PetsBlock/PetsBlock";
// // import { User as UserType, getUser } from "@/app/lib/api";

// export default function UserCard() {
//   const { user, isLoading, refetchUser } = useAuth();
//   // const [user, setUser] = useState<UserType | null>(null);
//   // const [loading, setLoading] = useState(true);

//   // const fetchUser = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const userData = await getUser(); // getUser использует httpOnly cookie
//   //     setUser(userData);
//   //   } catch (err) {
//   //     console.error(err);
//   //     setUser(null);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchUser();
//   // }, []);

//   if (isLoading) return <Loader progress={0} />;
//   if (!user) return <p>Failed to load user</p>;

//   return (
//     <div>
//       <h1>UserCard</h1>

//       {/* Блок информации о пользователе */}
//       <UserBlock user={user} onUpdate={refetchUser} />

//       {/* Кнопка редактирования пользователя */}
//       <EditUserBtn onSuccess={refetchUser} />

//       {/* Блок питомцев */}
//       <PetsBlock pets={user.pets || []} />
//     </div>
//   );
// }

"use client";

import Loader from "../Loader/Loader";
import UserBlock from "../UserBlock/UserBlock";
import { EditUserBtn } from "../EditUserBtn/EditUserBtn";
import { PetsBlock } from "../PetsBlock/PetsBlock";
import { useAuthStore } from "@/app/lib/store/auth";

export default function UserCard() {
  const { user, setUser } = useAuthStore();

  const refetchUser = async () => {
    const res = await fetch("/api/users/current/full", {
      credentials: "include",
    });
    if (!res.ok) return;
    const me = await res.json();
    setUser(me);
  };

  if (!user) return <Loader progress={0} />;

  return (
    <div>
      <UserBlock user={user} onUpdate={refetchUser} />
      <EditUserBtn onSuccess={refetchUser} />
      <PetsBlock pets={user.pets || []} onPetsChanged={refetchUser} />
    </div>
  );
}
