import { Request, Response } from "express";
import { prisma } from "../../server";
import { responseError, responseServerError, responseSuccess } from "../../utils/response.util";
import { comparePassword } from "../../utils/passwordUtils";
import { signToken } from "../../utils/jsonwebtoken";

export const signInService = async (req: Request, res: Response) => {
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
    return responseServerError(res, 'Internal server error');
  }
};
