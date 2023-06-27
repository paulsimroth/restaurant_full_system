import { SignJWT } from "jose";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "~/lib/auth";
import cookie from 'cookie';
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string() })).mutation(async ({ ctx, input }) => {
        const { res } = ctx;
        const { email, password } = input;

        if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            // user is authenticated as admin

            const token = await new SignJWT({})
                .setProtectedHeader({ alg: "HS256" })
                .setJti(nanoid())
                .setIssuedAt()
                .setExpirationTime("1h")
                .sign(new TextEncoder().encode(getJwtSecretKey()))

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('user-token', token, {
                    httpOnly: true,
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                })
            )

            return { success: true };
        }

        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "INVALID LOGIN CREDENTIALS"
        })
    }),
});