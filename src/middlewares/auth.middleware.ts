import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return next();

    const accessToken = authorization.split("Bearer ")[1];
    if (!accessToken) return next();

    const user = await userModel.getUserByAccessToken(accessToken);
    if (!user) throw new Error("Bad request");

    const newAccessToken = await userModel.createAccessToken(user);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 20,
    });
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}
