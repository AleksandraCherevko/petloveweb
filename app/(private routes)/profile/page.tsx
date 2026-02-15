// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/app/lib/store/auth";
// import UserCard from "@/app/components/UserCard/UserCard";
// import MyNotices from "@/app/components/MyNotices/MyNotices";

// import Loader from "@/app/components/Loader/Loader";

// const ProfilePage = () => {
//   const router = useRouter();
//   const { user, setUser, clearIsAuthenticated } = useAuthStore();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/users/current/full");
//         setUser(res.data);
//       } catch {
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!user) fetchUser();
//     else setLoading(false);
//   }, [user, setUser, router]);

//   if (loading) return <Loader progress={0} />;

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <UserCard />
//       <MyNotices />
//     </div>
//   );
// };

// export default ProfilePage;
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import UserCard from "@/app/components/UserCard/UserCard";
import MyNotices from "@/app/components/MyNotices/MyNotices";
import Loader from "@/app/components/Loader/Loader";

const ProfilePage = () => {
  const router = useRouter();
  const { user, setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/users/current/full", {
          credentials: "include",
        });
        if (!res.ok) {
          clearIsAuthenticated();
          router.push("/login");
          return;
        }
        const me = await res.json();
        setUser(me);
      } catch {
        clearIsAuthenticated();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!user) void run();
    else setLoading(false);
  }, [user, setUser, clearIsAuthenticated, router]);

  if (loading) return <Loader progress={0} />;

  return (
    <div>
      <h1>Profile Page</h1>
      <UserCard />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;
