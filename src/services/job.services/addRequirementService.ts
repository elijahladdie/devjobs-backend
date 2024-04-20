import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();
export const addRequirementService = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        const { content, items } = req.body;

        const requirement = await prisma.requirement.create({
            data: {
                content,
                items,
                jobId,
            },
        });

    return responseSuccess(res, 200, "Requirement added successfully", requirement);
    } catch (error) {
        console.error('Error adding requirement:', error);
        return   responseServerError(res, 'Internal server error');
    }
};
