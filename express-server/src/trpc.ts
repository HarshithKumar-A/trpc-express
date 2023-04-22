import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import context from "./context";


const t =  initTRPC.context<inferAsyncReturnType<typeof context>>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;