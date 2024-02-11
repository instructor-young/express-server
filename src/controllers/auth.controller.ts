import { Router } from "express";
import { logIn, signUp } from "../views/auth.view";

const authController = Router();

authController.post("/sign-up", signUp);
authController.post("/log-in", logIn);

export default authController;
