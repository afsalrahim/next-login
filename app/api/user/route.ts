import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {name, email, password} = body;

        // check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email : email }
        });
        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists"} , { status : 409 });
        }

        // create new user
        const newUser = db.user.create({
            data: {
                name,
                email,
                password
            }
        });
        

        return NextResponse.json(body);
    } catch (error) {
    }
}