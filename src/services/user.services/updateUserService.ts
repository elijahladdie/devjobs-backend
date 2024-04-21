import { Request, Response } from "express";
import { GeneratePassword, GenerateSalt } from "../../utils/passwordUtils";
import { prisma } from "../../server";
import { responseError, responseServerError, responseSuccess } from "../../utils/response.util";

export const updateUserService = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const {
            password, ...existingData } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return responseError(res, 400, "User doesn't  exists");
        }

        const salt = await GenerateSalt();

        let hashedPassword: any | undefined;
        if (password) {

            hashedPassword = await GeneratePassword(password, salt);
        }
        const updated = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                password: hashedPassword,
                ...existingData
            },
        });

        if (updated) {
            const { password, ...passwordFree } = updated
            return responseSuccess(res, 200, "User updated successfully", passwordFree);
        }
    } catch (e: any) {
        return responseServerError(res, e)
    }
};