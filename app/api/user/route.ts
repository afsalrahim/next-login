import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// define user schema
const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have 8 characters")
  });

export async function POST(req:Request) {
    try {
        const body = await req.json();

        // this is extra zod check to ensure nobody misuse the api 
        const {name, email, password} = userSchema.parse(body);

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
        const { password: passwordFetched, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status : 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating user"}, { status: 500 });
    }
}