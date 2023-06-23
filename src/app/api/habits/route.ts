import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const jwt = await getToken({ req });

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

  const habits = await prisma.habit.findMany({
    where: {
      user: {
        email: jwt.email,
      },
    },
    include: {
      user: true,
      _count: {
        select: {
          habitLog: {
            where: {
              createdAt: {
                gte: new Date(dateStart),
                lte: new Date(dateEnd),
              },
              marked: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(habits);
}
