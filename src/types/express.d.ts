declare namespace Express {
  interface Request {
    accessToken?: string;
    user: import("@prisma/client").User;
  }

  interface Response {
    sendJson: <T>(data?: T) => void;
  }
}
