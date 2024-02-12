import { Router } from "express";
import { logIn, logOut, refreshToken, signUp } from "../views/auth.view";

const authController = Router();

authController.post("/sign-up", signUp);
authController.post("/log-in", logIn);
authController.delete("/log-out", logOut);
authController.get("/refresh-token", refreshToken);

export default authController;
