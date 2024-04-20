import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseError, responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const removeRequirementService = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.jobId, 10);
        const ReqId = parseInt(req.params.id, 10);

        // Find the existing Requirement
        const existingRole = await prisma.requirement.findUnique({
            where: {
                id: ReqId,
                jobId: jobId,
            },
        });

        if (!existingRole) {
            return responseError(res, 404, "Requirement not found");
        }

        // Delete the existing Requirement
        await prisma.requirement.delete({
            where: {
                id: ReqId,
            },
        });

        return responseSuccess(res, 200, "Requirement  removed successfully");
    } catch (error) {
        console.error('Error removing Requirement:', error);
        return responseServerError(res, 'Internal server error');
    }
};
