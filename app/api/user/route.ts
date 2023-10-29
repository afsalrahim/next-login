import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

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

        const hashedPassword = await hash(password,10);
        // create new user
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password : hashedPassword
            }
        });
        return NextResponse.json({ user: newUser, message: "User created successfully" }, { status : 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating user"}, { status: 500 });
    }
}