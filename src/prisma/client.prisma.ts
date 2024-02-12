import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ model: _, operation: __, args, query }) {
        args.data = {
          ...args.data,
          profile: { create: {} },
          cart: { create: {} },
        };

        return query(args);
      },
    },
  },
});

console.log("ENV...", process.env.NODE_ENV, process.env.DATABASE_URL);

export default prisma;
