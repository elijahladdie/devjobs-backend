import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const getJobsService = async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        requirements: true,
        roles: true,
      },
    });

    return responseSuccess(res, 200, "Job fetched successfully", jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return responseServerError(res, 'Internal server error');
  }
};
