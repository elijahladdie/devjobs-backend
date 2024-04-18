import express from "express";
import { createUser, getUser, getUsers, signIn, updateUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/auth", signIn);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/update/:id", updateUser);

export default userRouter;

