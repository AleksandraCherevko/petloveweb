import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = "https://petlove.b.goit.study/api";

interface EditUserRequest {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: EditUserRequest = await req.json();

    const res = await fetch(`${BASE_URL}/users/current/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Update failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
