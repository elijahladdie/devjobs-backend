import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const addRoleService = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        const { content, items } = req.body;

        const role = await prisma.role.create({
            data: {
                content,
                items,
                jobId,
            },
        });


        return responseSuccess(res, 200, "Role added successfully", role);
    } catch (error) {
        console.error('Error adding role:', error);
        return responseServerError(res, 'Internal server error');
    }
};
