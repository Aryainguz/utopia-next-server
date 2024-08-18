import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const userid = context.params.id;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userid,
      },
    });
    if (!posts)
      return NextResponse.json(
        { message: "Post Not Found!", success: true },
        { status: 200 }
      );
    return NextResponse.json({ posts, success: true }, { status: 200 });
  } catch (error) {}
}
