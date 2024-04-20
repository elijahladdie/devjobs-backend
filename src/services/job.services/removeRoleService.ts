import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseError, responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const removeRoleService = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.jobId, 10);
        const roleId = parseInt(req.params.id, 10);

        // Find the existing role
        const existingRole = await prisma.role.findUnique({
            where: {
                id: roleId,
                jobId: jobId,
            },
        });

        if (!existingRole) {
            return responseError(res, 404, "Role not found");
        }

        // Delete the existing role
        await prisma.role.delete({
            where: {
                id: roleId,
            },
        });

        return responseSuccess(res, 200, "Role removed successfully");
    } catch (error) {
        console.error('Error removing role:', error);
        return responseServerError(res, 'Internal server error');
    }
};
