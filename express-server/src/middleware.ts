import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "./trpc";

const isAdminMiddleware = middleware(({ ctx, next }) => {
    if (!ctx.isAdmin) { throw new TRPCError({ code: 'UNAUTHORIZED' }) }

    return next({
        ctx: {
            user: {
                userId: 1
            }
        }
    })
});

export const adminprocedure = publicProcedure.use(isAdminMiddleware)