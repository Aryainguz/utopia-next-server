import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import cache from "@/utils/cache";




export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    const cachedUser = cache.get(`user-${id}`);
    if (cachedUser) {
      return NextResponse.json({ user: cachedUser, success: true }, { status:
        200 });
    }
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        username: true,
        id: true,
        avatarUrl: true,
      },
    });
    if (!user)
      return NextResponse.json(
        { message: "User Not Found!", success: true },
        { status: 200 }
      );
    cache.set(`user-${id}`, user);
    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error) {}
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    // Parse the request body
    const { username, avatarUrl, password } = await req.json();

    // Validate input (simple example, add more validation as needed)
    if (!username && !avatarUrl && !password) {
      return NextResponse.json(
        { message: "No fields to update", success: false },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (username) updateData.username = username;
    if (avatarUrl) updateData.avatarUrl = avatarUrl;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update the user
    const user = await prisma.user.update({
      where: { id: id },
      data: updateData,
      select: {
        username: true,
        id: true,
        avatarUrl: true,
      },
    });

    // clear the cache
    cache.del("posts");

    return NextResponse.json(
      { message: "User Updated Successfully!", success: true,user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
   
    return NextResponse.json({
        message:"User Deleted Successfully!",
        success:true
    },{status:200})
  } catch (error:any) {
    return NextResponse.json(
        { message: error.message, success: false },
        { status: 400 }
      );
  }
}
