import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";


export async function POST(req:NextRequest) {
 try {
    const {username,password,avatarUrl } = await req.json()
    if (!username || !avatarUrl || !password) {
        return NextResponse.json({ message: 'Username, email, and password are required',success:false }, { status: 400 });
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data:{
            username,
            password:hashedPassword,
            avatarUrl
        }
    })

    return NextResponse.json({message:"User Registered Successfully",success:true},{status:201})
 } catch (error:any) {
    return NextResponse.json({message:error.message,success:false},{status:400})
 }   
}