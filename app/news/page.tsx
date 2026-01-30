"use client";


import { useRouter, useSearchParams } from "next/navigation";

import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import NewsList from "../components/NewsList/NewsList";
import Pagination from "../components/Pagination/Pagination";
import SearchField from "../components/SearchField/SearchField";

import { useCallback, useEffect, useState } from "react";
import { getNewsClient, New } from "../lib/api";
import css from "./page.module.css";

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [news, setNews] = useState<New[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const currentPage = Number(searchParams.get("page")) || 1;


const fetchNews = useCallback(
  async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await getNewsClient(page, 6);
      const filteredResults = query
        ? res.results.filter(
            (item: New) =>
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.text.toLowerCase().includes(query.toLowerCase())
          )
        : res.results;
      setNews(filteredResults);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  },
  [query] 
);

useEffect(() => {
  fetchNews(currentPage);
}, [currentPage, fetchNews]);


 
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

  // Смена страницы
  const handlePageChangeAction = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    if (query) params.set("query", query);
    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className={css.newsPageContainer}>
      <Container>
        <Title as="h2">News</Title>

        <SearchField
          value={query}
          onChangeAction={(val: string) => setQuery(val)}
          onSubmitAction={handleSearchAction}
          placeholder="Search news..."
        />

        {loading ? <p>Loading...</p> : <NewsList news={news} />}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChangeAction={handlePageChangeAction}
        />
      </Container>
    </div>
  );
}
