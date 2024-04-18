import { Router } from "express";
import userRouter from "./user.route";

const router = Router();

router.use("/access", userRouter)

export default router
