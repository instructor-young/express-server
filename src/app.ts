import bodyParser from "body-parser";
import cors from "cors";
import Express from "express";
import controllers from "./controllers";
import { errorHandler } from "./error/handler.error";
import authMiddleware from "./middlewares/auth.middleware";
import enhancerMiddleware from "./middlewares/enhancer.middleware";
import prisma from "./prisma/client.prisma";

const app = Express();
const port = 3000;

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);
app.use(enhancerMiddleware);
app.use(authMiddleware);
app.use(controllers);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(async () => {
    await prisma.$disconnect();
  });
});
