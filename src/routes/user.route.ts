import express from "express";
import { createUser, getUser, getUsers, signIn, updateUser, deleteUser } from "../controllers/user.controller";
import isAuthenticated from "../utils/verifyToken";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/auth", signIn);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id/update/", isAuthenticated, updateUser);
userRouter.delete("/:id/delete/", isAuthenticated, deleteUser);

export default userRouter;

