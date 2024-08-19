import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const posts = await prisma.post.findMany();
        const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip 

        for (let post of posts) {
            // Check if the IP already exists in the viewedIp array
            const ipExists = post.viewdIp.includes(ip!); // !! to remove the undefined type

            if (ipExists) {
                return NextResponse.json({
                    success: true
                });
            } else {
                // Increment impressions and update the viewedIp array
                await prisma.post.update({
                    where: { id: post.id },
                    data: {
                        impressions: {
                            increment: 1,
                        },
                        viewdIp: {
                            push: ip
                        }
                    }
                });
            }
        }

        return NextResponse.json({
            message: "All Posts Impressions Increased Successfully!",
            success: true
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 400 });
    }
}
