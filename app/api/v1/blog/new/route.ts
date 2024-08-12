import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { content, userId } = await req.json();
        if (!content || !userId) {
            return NextResponse.json({ message: 'Content and userId are required', success: false }, { status: 400 });
        }


        // Create a new post
        await prisma.post.create({
            data: {
                content,
                userId, // Associate the post with the user
                likes: 0, // Initialize likes and impressions
                impressions: 0,
            },
        });

        return NextResponse.json({ message:"Post Created Successfully!", success: true }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 400 });
    }
}
