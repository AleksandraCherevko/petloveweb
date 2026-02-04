"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Notice } from "../lib/api";
import { getNoticesClient } from "../lib/api";

import Container from "../components/Container/Container";
import Title from "../components/Title/Title";
import NoticeList from "../components/NoticesList/NoticesList";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loader/Loader";
import NoticesFilters from "../components/NoticesFilters/NoticesFilters";
import css from "./page.module.css";

export default function Notices() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNoticesClient(currentPage, 6, query);
      setNotices(res.results);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentPage, query]);

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

  // const handleSearchAction = () => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("page", "1");

  //   if (query) params.set("query", query);
  //   else params.delete("query");

  //   router.push(`/notices?${params.toString()}`);
  // };

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
