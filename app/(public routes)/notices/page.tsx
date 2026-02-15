"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Notice } from "@/app/lib/api";
import { getNoticesClient } from "@/app/lib/api";

import Container from "@/app/components/Container/Container";
import Title from "@/app/components/Title/Title";
import NoticeList from "@/app/components/NoticesList/NoticesList";
import Pagination from "@/app/components/Pagination/Pagination";
import Loader from "@/app/components/Loader/Loader";
import NoticesFilters from "@/app/components/NoticesFilters/NoticesFilters";
import css from "./page.module.css";

export default function Notices() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const sex = searchParams.get("sex") ?? "";
  const species = searchParams.get("species") ?? "";
  const locationId = searchParams.get("locationId") ?? "";

  // const sortBy =
  //   (searchParams.get("sortBy") as "popularity" | "price" | null) ?? undefined;
  // const sortOrder =
  //   (searchParams.get("sortOrder") as "asc" | "desc" | null) ?? undefined;
  const currentPage = Number(searchParams.get("page")) || 1;

  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const sortParam = searchParams.get("sort");
  const sort =
    sortParam === "popular" ||
    sortParam === "unpopular" ||
    sortParam === "cheap" ||
    sortParam === "expensive"
      ? sortParam
      : undefined;

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNoticesClient({
        page: currentPage,
        perPage: 6,
        query,
        category,
        sex,
        species,
        locationId,
        sort,
      });
      setNotices(res.results);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentPage, query, category, sex, species, locationId, sort]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  useEffect(() => {
    if (!loading) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? prev : prev + 5));
    }, 200);

    return () => clearInterval(interval);
  }, [loading]);

  const handlePageChangeAction = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    if (query) params.set("query", query);
    else params.delete("query");

    router.push(`/notices?${params.toString()}`);
  };

  return (
    <div className={css.noticesPageContainer}>
      <Container>
        <Title as="h2" className={css.noticesPageTitle}>
          Find your favorite pet
        </Title>
        <NoticesFilters />
        {loading ? (
          <Loader progress={progress} />
        ) : (
          <NoticeList notices={notices} />
        )}

        {!loading && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChangeAction={handlePageChangeAction}
          />
        )}
      </Container>
    </div>
  );
}
