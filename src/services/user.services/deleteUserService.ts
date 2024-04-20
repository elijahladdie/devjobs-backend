// services/userService.ts

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { responseError, responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const deleteUserService = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id, 10);

    const existingJob = await prisma.user.findUnique({
        where: { id },
    });

    try {
        if (!existingJob) {
            return responseError(res, 404, "User not found")
        }

        const success = await prisma.user.delete({
            where: { id },
        });
        if (success) {
            return responseSuccess(res, 200, "User successful deleted")

        } else {
            return responseError(res, 404, "User not found")
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        return responseServerError(res, 'Internal server error');
    };

};

