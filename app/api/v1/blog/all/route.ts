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

    const response =  NextResponse.json({ posts, success: true }, { status: 200 });
      // Set Cache-Control header to prevent caching
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');
    
      return response;
    return
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
