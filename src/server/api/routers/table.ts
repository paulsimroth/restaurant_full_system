import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tableRouter = createTRPCRouter({
    /**
     * CUSTOMER CAN BOOK A TABLE, publicProcedure
     * Inputs according to schema.prisma Customer model
     */
    bookTable: publicProcedure
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
                    date
                },
            });
    
            return menuItem;
        }),
})