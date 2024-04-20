import { Request, Response } from "express";
import { createUserService } from "../services/user.services/createUserService";
import { getUsersService } from "../services/user.services/getUsersService";
import { getSingleUserService } from "../services/user.services/getSingleUserService";
import { updateUserService } from "../services/user.services/updateUserService";
import { signInService } from "../services/user.services/signInService";
import { deleteUserService } from "../services/user.services/deleteUserService";

export const createUser = async (req: Request, res: Response) => {
  await createUserService(req, res)
};

export const signIn = async (req: Request, res: Response) => {
  await signInService(req, res)
};


export const getUsers = async (req: Request, res: Response) => {
  await getUsersService(req, res)
};

export const getUser = async (req: Request, res: Response) => {
  await getSingleUserService(req, res)
};


export const updateUser = async (req: Request, res: Response) => {
  await updateUserService(req,res)
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserService(req,res)
};