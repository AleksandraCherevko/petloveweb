import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() ?? "";

    const res = await axios.get("https://petlove.b.goit.study/api/cities");
    const allCities = res.data; 

    const results = allCities.filter((c: { cityEn: string }) =>
      c.cityEn.toLowerCase().includes(search),
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch cities", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 },
    );
  }
}
