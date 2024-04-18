import { Request, Response } from "express";
import { prisma } from "../server";
import { GeneratePassword, GenerateSalt, comparePassword } from "../utils/passwordUtils";
import { responseError, responseServerError, responseSuccess } from "../utils/response.util";
import { signToken } from "../utils/jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email,
      username,
      password } = req.body;

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt)

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      },
    });

    return responseSuccess(res, 200, "User registered successfully", newUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return responseError(res, 401, "Invalid email or password");
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return responseError(res, 401, "Invalid email or password");
    }
    // Generate JWT token
    const token = signToken({ email: user.email, username: user.username });

    return responseSuccess(res, 200, "User authenticated successfully", token);
  } catch (error) {
    console.error(error);
    responseServerError(res, 'Internal server error');
  }
};




export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return responseSuccess(res, 200, "User fetched successfully", users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return responseSuccess(res, 200, "User fetched successfully", user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email,
      username,
      password } = req.body;

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt)

    const updated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        username,
        password: hashedPassword
      },
    });

    return responseSuccess(res, 200, "User updated successfully", updated);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};