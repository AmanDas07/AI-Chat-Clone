import express from "express";
import { loginController, logoutController, registerController } from "../controllers/authController.js";


const router = express.Router();

router.post("/Register", registerController);

router.post("/Login", loginController);

router.post("/Logout", logoutController);

export default router;