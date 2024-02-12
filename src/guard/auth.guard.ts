import { NextFunction, Request, Response } from "express";
import CError from "../error/error";

export default function authGuard(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  if (!req.user) throw new CError("Unauthorized", 401);

  next();
}
