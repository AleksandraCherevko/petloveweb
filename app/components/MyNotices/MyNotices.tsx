// "use client";

// import { useState, useEffect } from "react";
// import { Notice, getUser, api } from "@/app/lib/api";
// import NoticesItem from "../NoticesItem/NoticesItem";

// type Tab = "favorites" | "viewed";

// export default function MyNotices() {
//   const [activeTab, setActiveTab] = useState<Tab>("favorites");
//   const [favorites, setFavorites] = useState<Notice[]>([]);
//   const [viewed, setViewed] = useState<Notice[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Получаем текущего пользователя и его объявления
//   const fetchNotices = async () => {
//     setLoading(true);
//     try {
//       const user = await getUser();
//       setFavorites(user.noticesFavorites || []);
//       setViewed(user.noticesViewed || []);
//     } catch (err) {
//       console.error(err);
//       setFavorites([]);
//       setViewed([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   // Удаляем объявление из избранного
//   const removeFavorite = async (id: string) => {
//     try {
//       await api.delete(`/users/current/favorites/remove/${id}`);
//       setFavorites((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error("Failed to remove favorite", err);
//     }
//   };

//   if (loading) return <p>Loading notices...</p>;

//   return (
//     <div>
//       {/* Табы */}
//       <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
//         <button
//           onClick={() => setActiveTab("favorites")}
//           style={{
//             fontWeight: activeTab === "favorites" ? "bold" : "normal",
//           }}
//         >
//           My favorite pets
//         </button>
//         <button
//           onClick={() => setActiveTab("viewed")}
//           style={{
//             fontWeight: activeTab === "viewed" ? "bold" : "normal",
//           }}
//         >
//           Viewed
//         </button>
//       </div>

//       {/* Список объявлений */}
//       {activeTab === "favorites" && favorites.length === 0 && (
//         <p>No favorite notices yet.</p>
//       )}
//       {activeTab === "viewed" && viewed.length === 0 && (
//         <p>No viewed notices yet.</p>
//       )}

//       <ul>
//         {(activeTab === "favorites" ? favorites : viewed).map((notice) => (
//           <NoticesItem
//             key={notice._id}
//             notice={notice}
//             removable={activeTab === "favorites"}
//             onRemove={() => removeFavorite(notice._id)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }
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

  const currentList = activeTab === "favorites" ? favorites : viewed;

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
        {currentList.map((notice) => (
          <NoticesItem
            key={notice._id}
            notice={notice}
            removable={activeTab === "favorites"}
            onRemove={() => removeFavorite(notice._id)}
          />
        ))}
      </ul>
    </div>
  );
}
