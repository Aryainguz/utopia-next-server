import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    return NextResponse.json({ posts, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
