import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,
    context: { params: { id: string } }
) {
    const id = context.params.id;   
    try {
        const post = await prisma.post.update({
            where: { id: id },
            data: {
                likes: {
                    increment: 1
                }
            }
        });
        return NextResponse.json({
            success: true
        },{
            status: 200
        });
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
    
}