// controllers/job.controller.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseServerError, responseSuccess } from '../../utils/response.util';

const prisma = new PrismaClient();

export const createJobService = async (req: Request, res: Response) => {
  try {
    const { company, logo, logoBackground, position, postedAt, contract, location, website, apply, description } = req.body;

    const job = await prisma.job.create({
      data: {
        company,
        logo,
        logoBackground,
        position,
        postedAt,
        contract,
        location,
        website,
        apply,
        description,
      },
    });

    return responseSuccess(res, 200, "Job created successfully", job);
  } catch (error) {
    console.error('Error creating job:', error);
    return responseServerError(res, 'Internal server error');
  }
};
