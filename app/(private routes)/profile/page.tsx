"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import UserCard from "@/app/components/UserCard/UserCard";
import MyNotices from "@/app/components/MyNotices/MyNotices";
import Loader from "@/app/components/Loader/Loader";
import css from "./page.module.css";
import Container from "@/app/components/Container/Container";

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
    <div className={css.profilePage}>
      <Container>
        <div className={css.profilePageContainer}>
          <UserCard />
          <MyNotices />
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
