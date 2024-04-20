import { Request, Response } from "express";
import { prisma } from "../../server";
import { GeneratePassword, GenerateSalt } from "../../utils/passwordUtils";
import { responseError, responseServerError, responseSuccess } from "../../utils/response.util";

export const createUserService = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        // Generate a salt and hash the password
        const salt = await GenerateSalt();
        const hashedPassword = await GeneratePassword(password, salt);

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return responseError(res, 400, "User already exists");
        }

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        if (newUser) {
            const { password, ...passwordFree } = newUser
            return responseSuccess(res, 200, "User registered successfully", passwordFree);
        }
    } catch (e: any) {
        return responseServerError(res, e);
    }
};
