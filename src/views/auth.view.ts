import { RequestHandler } from "express";
import userModel from "../models/user.model";

export const signUp: RequestHandler<
  never,
  never,
  { email: string; password: string }
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("No email or password");

    const user = await userModel.createUser(email, password);
    const accessToken = await userModel.createAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 20,
    });
    res.status(200).send();
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
    if (!isCorrectPassword) throw new Error("Incorrect password");

    const user = await userModel.getUserByEmail(email);
    if (!user) throw new Error("No User");

    const accessToken = await userModel.createAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 20,
    });
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};
