"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Title from "@/app/components/Title/Title";
import Container from "@/app/components/Container/Container";
import NewsList from "@/app/components/NewsList/NewsList";
import Pagination from "@/app/components/Pagination/Pagination";
import SearchField from "@/app/components/SearchField/SearchField";
import Loader from "@/app/components/Loader/Loader";
import { useCallback, useEffect, useState } from "react";
import { getNewsClient, New } from "@/app/lib/api";
import css from "./page.module.css";

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [inputValue, setInputValue] = useState(query);
  const [news, setNews] = useState<New[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setProgress(0);

    try {
      const res = await getNewsClient(currentPage, 6, query);
      setNews(res.results);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 95 : prev + 5));
    }, 120);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!loading) setProgress(100);
  }, [loading]);

  const handleSearchAction = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    const trimmed = inputValue.trim();
    if (trimmed) params.set("query", trimmed);
    else params.delete("query");

    router.push(`/news?${params.toString()}`);
  };

  const handleClearAction = () => {
    setInputValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.delete("query");
    router.push(`/news?${params.toString()}`);
  };

  const handlePageChangeAction = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    if (query) params.set("query", query);
    else params.delete("query");
    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className={css.newsPageContainer}>
      <Container>
        <div className={css.newsPageWrapper}>
          <Title as="h2" className={css.newsTitle}>
            News
          </Title>

          <SearchField
            value={inputValue}
            onChangeAction={setInputValue}
            onSubmitAction={handleSearchAction}
            onClearAction={handleClearAction}
            placeholder="Search"
          />
        </div>

        {loading ? <Loader progress={progress} /> : <NewsList news={news} />}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChangeAction={handlePageChangeAction}
        />
      </Container>
    </div>
  );
}
