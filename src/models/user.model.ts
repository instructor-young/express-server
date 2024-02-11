import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, PASSWORD_SALT_ROUNDS } from "../config";
import prisma from "../prisma/client.prisma";

class UserModel {
  async createUser(email: string, password: string) {
    const encryptedPassword = await hash(password, PASSWORD_SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, encryptedPassword },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async getUserByAccessToken(accessToken: string) {
    const { sub: id } = jwt.verify(accessToken, JWT_SECRET_KEY);
    const user = await this.getUserById(Number(id));

    return user;
  }

  async verifyPassword(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { encryptedPassword: true },
    });
    if (!user) throw new Error("No user");

    const isVerified = compare(password, user.encryptedPassword);

    return isVerified;
  }

  async createAccessToken(user: Pick<User, "id" | "email">) {
    const { id, email } = user;
    const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
      subject: String(id),
    });

    return accessToken;
  }

  async updateProfile(
    userId: number,
    data: {
      nickname?: string;
      age?: number;
      gender?: "male" | "female";
    },
  ) {
    const { nickname, age, gender } = data;
    const profile = await prisma.userProfile.update({
      where: { id: userId },
      data: { nickname, age, gender },
    });

    return profile;
  }
}

const userModel = new UserModel();

export default userModel;
