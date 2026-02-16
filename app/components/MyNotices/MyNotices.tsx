"use client";

import { useEffect, useState } from "react";
import { Notice, getUser } from "@/app/lib/api";
import NoticesItem from "../NoticesItem/NoticesItem";

type Tab = "favorites" | "viewed";

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState<Tab>("favorites");
  const [favorites, setFavorites] = useState<Notice[]>([]);
  const [viewed, setViewed] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const currentList = (activeTab === "favorites" ? favorites : viewed).filter(
    (n) =>
      Boolean(
        (n as { _id?: string; id?: string })._id ??
        (n as { _id?: string; id?: string }).id,
      ),
  );

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      setFavorites(user.noticesFavorites || []);
      setViewed(user.noticesViewed || []);
    } catch (err) {
      console.error(err);
      setFavorites([]);
      setViewed([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchNotices();
  }, []);

  const removeFavorite = async (id: string) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/notices/favorites/remove/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to remove favorite");
        return;
      }

      setFavorites((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  if (loading) return <p>Loading notices...</p>;

  // const currentList = activeTab === "favorites" ? favorites : viewed;

  const handleFavoriteChange = async (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavorites((prev) => prev.filter((n) => n._id !== id));
    }
    await fetchNotices();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("favorites")}
          style={{ fontWeight: activeTab === "favorites" ? "bold" : "normal" }}
        >
          My favorite pets
        </button>
        <button
          onClick={() => setActiveTab("viewed")}
          style={{ fontWeight: activeTab === "viewed" ? "bold" : "normal" }}
        >
          Viewed
        </button>
      </div>

      {currentList.length === 0 && (
        <p>
          {activeTab === "favorites"
            ? "No favorite notices yet."
            : "No viewed notices yet."}
        </p>
      )}

      <ul>
        {currentList.map((notice) => {
          const safeId = notice._id ?? (notice as { id?: string }).id ?? "";
          return (
            <NoticesItem
              key={safeId}
              notice={notice}
              removable={activeTab === "favorites"}
              onRemove={() => removeFavorite(safeId)}
              onFavoriteChangeAction={handleFavoriteChange}
              onViewedChangeAction={() => {
                void fetchNotices();
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}
