import { Router } from "express";
import { getUser, signup } from "../controller/authController";

const authRouters = Router();

authRouters.post("/auth/signup", signup);
authRouters.get("/user", getUser);

export default authRouters;
