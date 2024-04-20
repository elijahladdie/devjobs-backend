import { Request, Response } from "express";
import { responseError, responseServerError, responseSuccess } from "../../utils/response.util";
import { prisma } from "../../server";

export const getSingleUserService = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
   
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return responseError(res, 400, "User doesn't  exists");
    }

const {password, ...passwordFree} = user
    return responseSuccess(res, 200, "User fetched successfully", passwordFree);
  } catch (e: any) {
    return responseServerError(res, e)
  }
};
