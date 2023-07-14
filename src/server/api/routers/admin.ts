import { SignJWT } from "jose";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
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

    createPresignedUrl: adminProcedure.input(z.object({ fileType: z.string() })).mutation(async ({ input }) => {
        const id = nanoid();

        const ex = input.fileType.split('/')[1];
        const key = `${id}.${ex}`;

        /*         const { url, fields } = await new Promise((resolve, reject) => {
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
        
                return { url, fields, key };*/
    }),

    /**
     * CHANGE CATEGORIES HERE AND UNDER H
     */
    addMenuItem: adminProcedure.input(
        z.object({
            name: z.string(),
            price: z.number(),
            description: z.string(),
            categories: z.array(z.union([z.literal('breakfast'), z.literal('lunch'), z.literal('dinner'), z.literal('beer and wine'), z.literal('cocktails')]))
        })
    ).mutation(async ({ ctx, input }) => {
        const { name, price, description, categories } = input
        const menuItem = await ctx.prisma.menuItem.create({
            data: {
                name,
                price,
                description,
                categories,
            },
        });

        return menuItem;
    }),

    deleteMenuItem: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            //Delete Image from S3
            const { id } = input
            /* await s3.deleteObject({ Bucket: 'restaurant-booking-bucket', Key: imageKey }).promise() */

            //Delete Item from Database
            await ctx.prisma.menuItem.delete({ where: { id } })

            return true;
        }),

    /**
     * CUSTOMER RESERVATION CAN ONLY BE DELETED BY ADMIN
     */
    deleteReservation: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input;

            await ctx.prisma.customer.delete({ where: { id } });

            return true;
        }),

    updateReservation: adminProcedure
        .input(z.object({
            id: z.string(), name: z.string(),
            surname: z.string(),
            phone: z.string(),
            email: z.string(),
            seats: z.number(),
            message: z.string(),
            date: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, name, surname, email, phone, date, seats, message } = input;

            await ctx.prisma.customer.update({
                where: { id }, data: {
                    name: name,
                    surname: surname,
                    phone: phone,
                    email: email,
                    seats: seats,
                    message: message,
                    date: date
                }
            });

            return true;
        }),


    /**
     * @function bookReservation does the same as @function bookTable in @file table.ts but as a admin only function for editing reservations in the backend
     */

    bookReservation: adminProcedure
        .input(z.object({
            name: z.string(),
            surname: z.string(),
            phone: z.string(),
            email: z.string(),
            seats: z.number(),
            message: z.string(),
            date: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, surname, phone, email, seats, message, date } = input
            const menuItem = await ctx.prisma.customer.create({
                data: {
                    name,
                    surname,
                    phone,
                    email,
                    seats,
                    message,
                    date,
                },
            });

            return menuItem;
        }),

    /**
     * @function getReservations shows the cuurent reservations to the admin
     */
    getReservations: adminProcedure
        .query(async ({ ctx }) => {
            const customers = ctx.prisma.customer.findMany()

            /*
            * getting individual bookings from database
            */
            const bookings = await Promise.all(
                (await customers).map(async (customer) => ({
                    ...customer,
                }))
            );

            return bookings;
        }),
});