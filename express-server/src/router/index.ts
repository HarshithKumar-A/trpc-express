import { z } from 'zod';
import { publicProcedure, router } from "../trpc";
import { userRouter } from './user';


export const appRouter = router({
	hello: publicProcedure.query(() => {
		return 'Hello'
	}),
	greeting: publicProcedure
	  .input(z.object({ name: z.string() }).nullish())
	  .query(({ input }) => {
		return `Hello ${input?.name ?? 'World'}`;
	  }),
	login: publicProcedure.input((id) => {
		if (typeof id === 'number') { return id}
		else {throw new Error('invalid type: number expected!')}
	}).mutation(req => {
		console.log('id : ', req.input);
		return true
	}),
	user: userRouter
})


export type AppRouter = typeof appRouter;