import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";

// Create a new cache instance
const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache for 5 minutes

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    // Check if post data is already in cache
    const cachedPost = cache.get(id);

    if (cachedPost) {
      return NextResponse.json({ post: cachedPost, success: true }, { status: 200 });
    }

    // If not cached, fetch from database
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        likes: true,
        impressions: true,
        likedBy: true,
        user: true,
      },
    });

    if (!post)
      return NextResponse.json(
        { message: "Post Not Found!", success: false },
        { status: 404 }
      );

    // Store the fetched post in cache
    cache.set(id, post);

    return NextResponse.json({ post, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    // Delete the post from the database
    await prisma.post.delete({
      where: {
        id,
      },
    });

    // Remove the post from cache if it exists
    cache.del(id);

    return NextResponse.json(
      {
        message: "Post Deleted Successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
