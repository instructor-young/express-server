import { UserProfile } from "@prisma/client";
import { RequestHandler } from "express";
import userModel from "../models/user.model";

export const updateProfile: RequestHandler<
  never,
  { profile: UserProfile },
  { nickname?: string; age?: number; gender?: "male" | "female" }
> = async (req, res, next) => {
  try {
    const user = req.user;
    const { nickname, age, gender } = req.body;
    const profile = await userModel.updateProfile(user.id, {
      nickname,
      age,
      gender,
    });

    res.sendJson(profile);
  } catch (e) {
    next(e);
  }
};
