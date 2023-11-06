import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";
import { compare } from "bcrypt";


export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // if email or password not entered
            if(!credentials?.email || !credentials?.password) {
                return null;
            }

            // get the existing user
            const existingUser =  await db.user.findUnique( {
                where: { email: credentials.email }
            })
            // not valid user
            if(!existingUser) { return null; }
            
            const passwordMatch = await compare(credentials.password, existingUser.password);
            console.log("here")
            console.log(passwordMatch);

            // not valid password
            if(!passwordMatch) { return null; }

            // Return 
            return {
                id: `${existingUser.id}`,
                email: existingUser.email,
                name: existingUser.name
            }
          }
        })
      ]}