"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import UserCard from "@/app/components/UserCard/UserCard";
import MyNotices from "@/app/components/MyNotices/MyNotices";
import axios from "axios";
import Loader from "@/app/components/Loader/Loader";

const ProfilePage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
    else setLoading(false);
  }, [user, setUser, router]);

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
