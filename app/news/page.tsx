"use client";

import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import css from "./page.module.css";
import { New } from "../lib/api";
import NewsList from "../components/NewsList/NewsList";
import Pagination from "../components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getNewsClient } from "../lib/api";

export default function NewsPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [news, setNews] = useState<New[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await getNewsClient(currentPage); // запрос к /api/news
        setNews(res.results);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentPage]);

  return (
    <div className={css.newsPageContainer}>
      <Container>
        <section>
          <Title as="h2">News</Title>
          {loading ? <p>Loading...</p> : <NewsList news={news} />}
        </section>
        <Pagination totalPages={totalPages} />
      </Container>
    </div>
  );
}
