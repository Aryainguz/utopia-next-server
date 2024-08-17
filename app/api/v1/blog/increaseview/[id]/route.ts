import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    context: { params: { id: string } }
  ) {
    const id = context.params.id;
    try {

        await prisma.post.update({
            where:{
                id:id
            },
            data:{
                impressions:{
                    increment:1
                }
            }
        })
        return NextResponse.json({message:"Post Impressions Increased Successfully!",success:true},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message,success:false},{status:400})
    }
  }