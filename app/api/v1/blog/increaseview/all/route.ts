import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(params:NextResponse){
    try {
        await prisma.post.updateMany({
            data:{
                impressions:{
                    increment:1
                }
            }
        })
        return NextResponse.json({message:"All Posts Impressions Increased Successfully!",success:true},{status:200})        
    } catch (error:any) {
        return NextResponse.json({message:error.message,success:false},{status:400})
        
    }
}