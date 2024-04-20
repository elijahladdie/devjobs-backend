import { Router } from "express";
import userRouter from "./user.route";
import jobRouter from "./job.route";

const router = Router();

router.use("/access", userRouter)
router.use("/jobs", jobRouter)

export default router
