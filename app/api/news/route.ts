// app/api/news/route.ts
import { NextResponse } from "next/server";
import { api, NewsListResponse } from "@/app/lib/api";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const perPage = Number(url.searchParams.get("perPage")) || 6;

    const res = await api.get<NewsListResponse>("/news", {
      params: { page, perPage },
    });

    return NextResponse.json(res.data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
