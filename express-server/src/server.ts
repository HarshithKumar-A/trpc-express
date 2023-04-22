import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import cors from "cors";
// import ws from 'ws';
import WebSocket, { WebSocketServer } from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws'

import context from './context';
import { appRouter } from './router';

const app: express.Application = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: context,
}))


const port: number = 3000;
const server  = app.listen(port, () => {
    console.log(`TypeScript with Express
		http://localhost:${port}/`);
});


applyWSSHandler({
    wss: new WebSocketServer({ server }),
    router: appRouter,
    createContext: context
})