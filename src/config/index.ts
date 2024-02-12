import dotenv from "dotenv";
import CError from "../error/error";
dotenv.config();

export const PASSWORD_SALT_ROUNDS = 12;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

if (!JWT_SECRET_KEY) throw new CError("No JWT_SECRET_KEY");
