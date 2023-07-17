import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { formatISO } from "date-fns";

export const openingRouter = createTRPCRouter({
    /**
     * MEthod for chaning opening hours for a specific day
     * @expects Array of all days including their opening hours
     * @returns Array of all updated days
     */

    changeOpeningHours: adminProcedure
        .input(
            z.array(
                z.object({
                    id: z.string(),
                    name: z.string(),
                    openTime: z.string(),
                    closeTime: z.string(),
                })
            )
        )
        .mutation(async ({ ctx, input }) => {
            const results = await Promise.all(
                input.map(async (day) => {
                    const updateDay = await ctx.prisma.day.update({
                        where: {
                            id: day.id,
                        },
                        data: {
                            openTime: day.openTime,
                            closeTime: day.closeTime,
                        },
                    })

                    return updateDay;
                })
            )

            return results;
        }),

    /**
     * Method for closing a day so no tables can be booked
     * @param date Date to close
     */

    closedDay: adminProcedure.input(z.object({ date: z.date() })).mutation(async ({ ctx, input }) => {
        await ctx.prisma.closedDay.create({
            data: {
                date: input.date,
            },
        })
    }),

    /**
     * Method to opüen a previously closed day so tables can be booked
     * @param date Date to open
     */

    openDay: adminProcedure.input(z.object({ date: z.date() })).mutation(async ({ ctx, input }) => {
        await ctx.prisma.closedDay.delete({
            where: {
                date: input.date,
            },
        })
    }),

    /**
     * Method to get all closed days
     * @returns Array of dates in ISO format
     * @example ['2023-08-01T09:00:00:000Z', '2023-08-02T09:00:00:000Z']
     */

    getClosedDays: adminProcedure.query(async ({ ctx }) => {
        const closedDays = await ctx.prisma.closedDay.findMany();
        return closedDays.map((d: any) => formatISO(d.date))
    })
})