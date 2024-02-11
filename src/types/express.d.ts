declare namespace Express {
  interface Request {
    accessToken?: string;
    user: import("@prisma/client").User;
  }
}
