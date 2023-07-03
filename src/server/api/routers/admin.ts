import { SignJWT } from "jose";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "~/lib/auth";
import cookie from 'cookie';
import { TRPCError } from "@trpc/server";
import { s3 } from "~/lib/s3";
import { maxFileSize } from "~/constants";

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

    createPresignedUrl: adminProcedure.input(z.object({ fileType: z.string() })).mutation(async ({input}) => {
        const id = nanoid();
        
        const ex = input.fileType.split('/')[1];
        const key = `${id}.${ex}`;

        const { url, fields } = await new Promise((resolve, reject) => {
            s3.createPresignedPost({
                Bucket: 'restaurant-booking-bucket',
                Fields: { key },
                Expires: 60,
                Conditions: [
                    ['content-length-range', 0, maxFileSize],
                    ['starts-with', '$Content-type', 'image/'],
                ],
            },

                (err, data) => {
                    if (err) return reject(err)
                    resolve(data)
                }
            )
        }) as any as { url: string, fields: any }

        return { url, fields, key };
    }),

    addMenuItem: adminProcedure.input(
        z.object({
            name: z.string(),
            price: z.number(),
            imageKey: z.string(),
            categories: z.array(z.union([z.literal('breakfast'), z.literal('lunch'), z.literal('dinner'), z.literal('beer and wine'), z.literal('cocktails')]))
        })
    ).mutation(async ({ ctx, input }) => {
        const { name, price, imageKey, categories } = input
        const menuItem = await ctx.prisma.menuItem.create({
            data: {
                name,
                price,
                categories,
                imageKey,
            },
        });

        return menuItem;
    }),

    deleteMenuItem: adminProcedure
        .input(z.object({ imageKey: z.string(), id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            //Delete Image from S3
            const { id, imageKey } = input
            await s3.deleteObject({ Bucket: 'restaurant-booking-bucket', Key: imageKey }).promise()

            //Delete Iamage from Database
            await ctx.prisma.menuItem.delete({ where: { id } })

            return true;
        })
});