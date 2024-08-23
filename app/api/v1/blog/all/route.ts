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
    
    // Set Cache-Control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    
      return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
