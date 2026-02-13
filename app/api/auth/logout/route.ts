import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = "https://petlove.b.goit.study/api";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      await fetch(`${BASE_URL}/users/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const response = NextResponse.json({ message: "Logged out" });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
