import { getHabits } from "@/lib/data";
import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const jwt = await getToken({ req });

  // TODOS: handle in middleware
  if (!jwt || !jwt?.email) {
    return NextResponse.json("Unauthorized", {
      status: 401,
    });
  }

  const { searchParams } = new URL(req.nextUrl);
  const dateStart = searchParams.get("dateStart");
  const dateEnd = searchParams.get("dateEnd");

  if (!dateStart || !dateEnd) {
    return NextResponse.json("Bad Request", {
      status: 400,
    });
  }

  const habits = await getHabits({
    dateStart: new Date(dateStart),
    dateEnd: new Date(dateEnd),
    email: jwt.email,
  });

  return NextResponse.json(habits);
}
