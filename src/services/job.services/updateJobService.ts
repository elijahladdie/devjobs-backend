import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseError, responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();
export const updateJobService = async (req: Request, res: Response) => {
  try {
    const jobId = parseInt(req.params.id, 10);


    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return responseError(res, 404, 'Job not found');
    }



    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        ...req.body
      },
    });

    return responseSuccess(res, 200, "Job updated successfully", updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    return responseServerError(res, 'Internal server error');
  }
};
