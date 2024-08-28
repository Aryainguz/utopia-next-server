import prisma from "@/lib/prisma";
import cache from "@/utils/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const headers = new Headers({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    });
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        id: true,
        likes: true,
        impressions: true,
        likedBy: true,
        user: true,
        createdAt: true,
      },
    });

    const response = NextResponse.json(
      { posts, success: true },
      { status: 200, headers }
    );

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
