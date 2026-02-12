"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import UserCard from "@/app/components/UserCard/UserCard";
import MyNotices from "@/app/components/MyNotices/MyNotices";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1>Profile Page</h1>
      <UserCard />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;
