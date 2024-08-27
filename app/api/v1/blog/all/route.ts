import prisma from "@/lib/prisma";
import cache from "@/utils/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cachedPosts  = cache.get("posts");
    if (cachedPosts) {
      return NextResponse.json({ posts: cachedPosts, success: true }, { status: 200 });
    } 
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


    cache.set("posts", posts);
    const response =  NextResponse.json({ posts, success: true }, { status: 200 });

      return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
