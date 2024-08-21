import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(username, password);
    const isPasswordMatch = await bcrypt.compare(password, user?.password ?? "");
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials", success: false },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: {
        username: username,
      },
    });

    return NextResponse.json(
      {
        message: "User Deleted Successfully!",
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
