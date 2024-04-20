// services/jobService.ts

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { responseError, responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const deleteJobService = async (req: Request, res: Response) => {

    const jobId = parseInt(req.params.id, 10);

    try {
        const success = await deleteJob(jobId)
        if (success) {
            responseSuccess(res, 200, "Successful deleted")

        } else {
            responseError(res, 404, "Job not found")
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        responseServerError(res, 'Internal server error');
    };

};
const deleteJob = async (jobId: number) => {
    try {
        // Check if the job exists
        const existingJob = await prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!existingJob) {
            throw new Error('Job not found');
        }

        // Delete associated roles and requirements
        await prisma.role.deleteMany({
            where: { jobId },
        });

        await prisma.requirement.deleteMany({
            where: { jobId },
        });

        // Delete the job
        await prisma.job.delete({
            where: { id: jobId },
        });

        return true;
    } catch (error) {
        return false
    }
};
