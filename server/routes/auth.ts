import { Router } from "express";
import { signup } from "../controller/authController";

const authRouters = Router();

authRouters.post("/auth/signup", signup);

export default authRouters;
