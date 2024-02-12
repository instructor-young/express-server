import bodyParser from "body-parser";
import cors from "cors";
import Express, { Request, Response } from "express";
import controllers from "./controllers";
import authMiddleware from "./middlewares/auth.middleware";
import prisma from "./prisma/client.prisma";

const app = Express();
const port = 3000;

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);
app.use(authMiddleware);
app.use(controllers);
app.use((err: Error, _: Request, res: Response) => {
  res.json({ error: { message: err.message } });
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(async () => {
    await prisma.$disconnect();
  });
});
