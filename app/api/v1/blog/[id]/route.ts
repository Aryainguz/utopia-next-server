import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        content: true,
        id: true,
        likes: true,
        impressions: true,
        likedBy: true,
        user: true,
      },
    });
    if (!post)
      return NextResponse.json(
        { message: "Post Not Found!", success: true },
        { status: 200 }
      );
    return NextResponse.json({ post, success: true }, { status: 200 });
  } catch (error) {}
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
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
