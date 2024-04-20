import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseError, responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const getSingleJobService = async (req: Request, res: Response) => {
  try {
    const jobId = parseInt(req.params.id, 10);

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        requirements: true,
        roles: true,
      },
    });

    if (!job) {
      return responseError(res, 404, "Job not found");
    }

    return responseSuccess(res, 200, "Job fetched successfully", job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return responseServerError(res, 'Internal server error');
  }
};
