import { createTRPCProxyClient, createWSClient, httpBatchLink, httpLink, loggerLink, splitLink, wsLink } from '@trpc/client';
import type { AppRouter } from '../../express-server/src/router'
// import fetch from 'node-fetch';

// const globalAny = global as any;
// globalAny.AbortController = AbortController;
// globalAny.fetch = fetch;

const wsClient = createWSClient({
    url: 'ws://localhost:3000/trpc'
})

async function main() {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            // loggerLink(),
            httpBatchLink({
                url: 'http://localhost:3000/trpc',
                headers: { Authorization: 'TOCKEN' },
            }),
            // wsLink({
            //     client: wsClient
            // }),
            // splitLink({
            //     condition: op => {
            //         return op.type === 'subscription'
            //     },
            //     true: wsLink({
            //         client: wsClient
            //     }),
            //     false: httpBatchLink({
            //         url: 'http://localhost:3000/trpc',
            //         headers: { Authorization: 'TOCKEN' },
            //     }),
            // })
            // httpLink({
            //     url: 'http://localhost:3000/trpc',
            //     headers: { Authorization: 'TOCKEN' },
            // }),
        ],
    });

    // Query
    const withoutInputQuery = await client.hello.query();
    console.log(withoutInputQuery);
    const withInputQuery = await client.greeting.query({ name: 'Alex' });
    console.log(withInputQuery);

    // // mutate
    // const login = await client.login.mutate(90);
    // console.log(login);

    // // batch link
    // client.greeting.query({ name: 'Alex' });
    // client.greeting.query({ name: 'Binod' });
    // client.greeting.query({ name: 'Clara' });
    // client.greeting.query({ name: 'Devid' });

    // client.login.mutate(90);
    // client.login.mutate(20);
    // client.login.mutate(30);
    // client.login.mutate('kk');

    // // user router
    // const user = await client.user.getUser.query({ userId: 12 });
    // console.log(user);
    // const updateUser = await client.user.updateUser.mutate({ userId: 12, name: 'devid' });
    // console.log(updateUser);


    // // admin router
    // const deleteUser = await client.user.deleteUsers.mutate(89);

    // // Websocket update user
    const button = document.createElement('button');
    button.innerHTML = 'Update User';
    button.classList.add('btn-outline-primary', 'btn', 'm-3');
    button.addEventListener('click', function () {
        client.user.updateUser.mutate({ userId: 13, name: 'Bind' });
    });
    document.getElementById('app')?.appendChild(button);


}

void main();
