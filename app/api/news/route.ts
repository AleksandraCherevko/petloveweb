import {api,  NewsListResponse } from "@/app/lib/api";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const perPage = Number(url.searchParams.get("perPage")) || 6;
    const keyword = url.searchParams.get("query") || ""; // сюда берем query с фронта

    const res = await api.get<NewsListResponse>("/news", {
      params: { page, limit: perPage, keyword }, // <-- добавили keyword
    });

    return NextResponse.json(res.data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
