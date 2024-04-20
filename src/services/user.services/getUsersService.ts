import { Request, Response } from "express";
import { responseError, responseServerError, responseSuccess } from "../../utils/response.util";
import { prisma } from "../../server";

export const getUsersService = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return responseError(res, 404, "No users found");
    }
    const passwordFreeUsers = users.map(user => {
      const { password, ...rest } = user;
      return rest;
    });

    return responseSuccess(res, 200, "Users fetched successfully", passwordFreeUsers);
  } catch (e: any) {
    return responseServerError(res, e);
  }
};
