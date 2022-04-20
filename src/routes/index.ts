import { Router } from "express";
import authRouter from "./authRouter.js";

const router: Router = Router();

router.use("/auth", authRouter)

export default router