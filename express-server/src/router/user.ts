import { publicProcedure, router } from "../trpc";
// import {adminprocedure}
import { observable } from "@trpc/server/observable";
import { z } from 'zod';
import { EventEmitter } from 'events';
import { adminprocedure } from "../middleware";
import { emit } from "process";

const userProcedure = publicProcedure.input((z.object({ userId: z.number() })))
const eventEmitter = new EventEmitter();


export const userRouter = router({
    getList: publicProcedure.query(_ => {
        return []
    }),
    getUser: userProcedure.query(req => {
        console.log(req.ctx.isAdmin);
        return { userId: req.input.userId, user: 'name' + req.input.userId }
    }),
    addUser: publicProcedure.mutation(req => {

        return `new user added!`
    }),
    updateUser: userProcedure
        .input(z.object({ name: z.string() }))
        .output(z.object({ str: z.string() }))
        .mutation(req => {
            console.log(`isAdmin: ${req.ctx.isAdmin}, id: ${req.input.userId}, name: ${req.input.name}`);
            eventEmitter.emit('update', req.input.userId)
            return { str: `new user (${req.input.name}) added!` }
        }),

    deleteUsers: adminprocedure.mutation(req => {
        return 'user deleted successfully!'
    }),
    onUpdate: publicProcedure.subscription(() => {
        return observable<string>(emit => {
            eventEmitter.on('update', emit.next);
            return () => {
                eventEmitter.off('update', emit.next);
            }
        })
    })
})