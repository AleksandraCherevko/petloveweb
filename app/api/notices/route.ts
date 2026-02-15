import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "6";

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const sex = searchParams.get("sex") ?? "";
  const species = searchParams.get("species") ?? "";
  const locationId = searchParams.get("locationId") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const sortParams =
    sort === "popular"
      ? { byPopularity: true }
      : sort === "unpopular"
        ? { byPopularity: false }
        : sort === "cheap"
          ? { byPrice: true }
          : sort === "expensive"
            ? { byPrice: false }
            : {};

  try {
    const res = await axios.get("https://petlove.b.goit.study/api/notices", {
      params: {
        page,
        perPage,
        ...(query ? { keyword: query } : {}),
        ...(category ? { category } : {}),
        ...(sex ? { sex } : {}),
        ...(species ? { species } : {}),
        ...(locationId ? { locationId } : {}),
        ...sortParams,
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notices" },
      { status: 500 },
    );
  }
}
