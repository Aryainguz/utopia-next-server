import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true, 
        id: true,
        avatarUrl: true,
      },
    });
    return NextResponse.json({ users, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
