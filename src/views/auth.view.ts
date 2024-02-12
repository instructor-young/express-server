import { RequestHandler } from "express";
import CError from "../error/error";
import userModel from "../models/user.model";

export const signUp: RequestHandler<
  never,
  never,
  { email: string; password: string }
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new CError("No email or password", 400);

    const user = await userModel.createUser(email, password);
    const accessToken = await userModel.createAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 20,
      domain: ".cloudtype.app",
    });
    res.status(200).sendJson();
  } catch (e) {
    next(e);
  }
};

export const logIn: RequestHandler<
  never,
  never,
  { email: string; password: string }
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isCorrectPassword = await userModel.verifyPassword(email, password);
    if (!isCorrectPassword) throw new CError("Incorrect password", 400);

    const user = await userModel.getUserByEmail(email);
    if (!user) throw new CError("No User", 404);

    const accessToken = await userModel.createAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 20,
      domain: ".cloudtype.app",
    });
    res.status(200).sendJson();
  } catch (e) {
    next(e);
  }
};

export const logOut: RequestHandler = async (_, res, next) => {
  try {
    res.clearCookie("accessToken", {
      domain: ".cloudtype.app",
      httpOnly: true,
      secure: true,
    });
    res.status(200).sendJson();
  } catch (e) {
    next(e);
  }
};

export const refreshToken: RequestHandler<
  never,
  never,
  { email: string; password: string }
> = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.clearCookie("accessToken", {
        domain: ".cloudtype.app",
        httpOnly: true,
        secure: true,
      });
      res.status(204).sendJson();

      return;
    }

    const accessToken = await userModel.createAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 20,
      domain: ".cloudtype.app",
    });
    res.status(200).sendJson();
  } catch (e) {
    next(e);
  }
};
