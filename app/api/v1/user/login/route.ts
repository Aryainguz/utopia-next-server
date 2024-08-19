import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  
  try {
    if (!username || !password) {
      return NextResponse.json({
        message: "Username, and password are required",
        success: false,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User Not Found!", success: false },
        { status: 404 }
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid Password!",
          success: false,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "User Logged In Successfully",
        success: true,
        user:user
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
