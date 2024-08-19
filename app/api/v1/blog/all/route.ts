import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";

// Create a new cache instance
const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache for 5 minutes

export async function GET(req: NextRequest) {
    try {
        // Check if posts data is already in cache
        const cachedPosts = cache.get("posts");

        if (cachedPosts) {
            return NextResponse.json({ posts: cachedPosts, success: true }, { status: 200 });
        }

        // If not cached, fetch from database
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

        // Store the fetched posts in cache
        cache.set("posts", posts);

        return NextResponse.json({ posts, success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 400 });
    }
}
