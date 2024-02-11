import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";

export default async function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return next();

    const accessToken = authorization.split("Bearer ")[1];
    if (!accessToken) return next();

    const user = await userModel.getUserByAccessToken(accessToken);
    if (!user) throw new Error("No user");

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}
