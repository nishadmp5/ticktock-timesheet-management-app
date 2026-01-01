import connectToDatabase from "@/lib/dbConnect"
import User from "@/lib/models/user"
import { NextResponse } from "next/server"


export const POST = async (request)=>{
    try {
        const body = await request.json()

        await connectToDatabase()

        const newUser = new User(body)

        await newUser.save()

        return NextResponse.json(
            {message:"User created",user:newUser},
            {status:201}
        )
    } catch (error) {
        return NextResponse.json(
            {message:"Error creating user",error:error.message},
            {status:500}
        )
    }
}