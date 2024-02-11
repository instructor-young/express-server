import { Router } from "express";
import { updateProfile } from "../views/users.view";

const usersController = Router();

usersController.put("/profile", updateProfile);

export default usersController;
