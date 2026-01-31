"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import NewsList from "../components/NewsList/NewsList";
import Pagination from "../components/Pagination/Pagination";
import SearchField from "../components/SearchField/SearchField";
import Loader from "../components/Loader/Loader";
import { useCallback, useEffect, useState } from "react";
import { getNewsClient, New } from "../lib/api";
import css from "./page.module.css";

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [news, setNews] = useState<New[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const fetchNews = useCallback(async () => {
    setLoading(true);
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

  const handleSearchAction = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    router.push(`/news?${params.toString()}`);
  };

  const handlePageChangeAction = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    if (query) params.set("query", query);
    router.push(`/news?${params.toString()}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  }, []);

  return (
    <div className={css.newsPageContainer}>
      <Container>
        <div className={css.newsPageWrapper}>
          <Title as="h2" className={css.newsTitle}>
            News
          </Title>

          <SearchField
            value={query}
            onChangeAction={(val) => {
              const params = new URLSearchParams(searchParams.toString());
              if (val) params.set("query", val);
              else params.delete("query");
              params.set("page", "1");
              router.replace(`/news?${params.toString()}`);
            }}
            onSubmitAction={handleSearchAction}
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
