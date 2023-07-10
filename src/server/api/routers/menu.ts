import { createTRPCRouter, publicProcedure} from "../trpc";

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const menuRouter = createTRPCRouter({
    getMenuItems: publicProcedure.query(async ({ctx}) => {
        const menuItems = ctx.prisma.menuItem.findMany()

        /*
        * Each menuItems only contains AWS key
        * Extend all items with actual image url 
        */
        const withUrls = await Promise.all(
            (await menuItems).map(async (menuItem) => ({
                ...menuItem,
/*                 url: await s3.getSignedUrlPromise('getObject', {
                    Bucket: "restaurant-booking-bucket",
                    Key: menuItem.imageKey,
                }) */
            }))
        );

        return withUrls;
    }),

    checkMenuStatus: publicProcedure.query(async () => {
        //Handle menu checking
        await sleep(1000)
        return {success: true}
    }),
});