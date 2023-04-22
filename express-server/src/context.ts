// import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// const context = ({ req, res }: CreateExpressContextOptions) => {
//   return {
//     req,
//     res,
//     isAdmin: false
//   };
// };

// export default context;



import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

const context = () => {
  return {
    isAdmin: false
  };
};

export default context;