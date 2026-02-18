"use client";

import { useEffect, useState } from "react";
import { Notice, getUser } from "@/app/lib/api";
import NoticesItem from "../NoticesItem/NoticesItem";
import css from "./MyNotices.module.css";
import clsx from "clsx";
import Loader from "../Loader/Loader";

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

  if (loading) return <Loader />;

  const handleFavoriteChange = async (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavorites((prev) => prev.filter((n) => n._id !== id));
    }
    await fetchNotices();
  };

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabsWrap}>
        <button
          className={clsx(
            css.tabBtn,
            activeTab === "favorites" ? css.tabBtnActive : "",
          )}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>
        <button
          onClick={() => setActiveTab("viewed")}
          className={clsx(
            css.tabBtn,
            activeTab === "viewed" ? css.tabBtnActive : "",
          )}
        >
          Viewed
        </button>
      </div>

      {currentList.length === 0 && (
        <p className={css.noFavorites}>
          {activeTab === "favorites" ? (
            <>
              Oops,{" "}
              <span className={css.noFavoritesSpan}>
                looks like there are no furries
              </span>{" "}
              on our adorable page yet. Do not worry! View your pets on the
              &ldquo;find your favorite pet&rdquo; page and add them to your
              favorites.
            </>
          ) : (
            <>
              Oops,{" "}
              <span className={css.noFavoritesSpan}>
                there are no recently viewed pets
              </span>{" "}
              yet. Take a look at the &ldquo;find your favorite pet&rdquo; page
              and discover your new furry friend.
            </>
          )}
        </p>
      )}

      <ul className={css.noticesList}>
        {currentList.map((notice) => {
          const safeId = notice._id ?? (notice as { id?: string }).id ?? "";
          return (
            <NoticesItem
              className={css.myNoticesItem}
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
