import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    context: { params: { id: string } }
  ) {
    const id = context.params.id;
    try {

        const post = await prisma.post.findFirst({
            where: {
                id: id
            }
        });
        const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip
        const ipExists = post?.viewdIp.includes(ip!); // !! to remove the undefined type



        if (ipExists) {
            return NextResponse.json({
                success: true
            });
        } else {
            // Increment impressions and update the viewedIp array
            await prisma.post.update({
                where: { id: id },
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

        return NextResponse.json({message:"Post Impressions Increased Successfully!",success:true},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message,success:false},{status:400})
    }
  }