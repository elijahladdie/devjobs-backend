// controllers/jobController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createJobService } from '../services/job.services/createJobService';
import { getSingleJobService } from '../services/job.services/getSingleJobService';
import { getJobsService } from '../services/job.services/getJobsService';
import { addRequirementService } from '../services/job.services/addRequirementService';
import { addRoleService } from '../services/job.services/addRoleService';
import { updateJobService } from '../services/job.services/updateJobService';
import { deleteJobService } from '../services/job.services/deleteJobService';
import { removeRoleService } from '../services/job.services/removeRoleService';
import { removeRequirementService } from '../services/job.services/removeRequirementService';

const prisma = new PrismaClient();

export const createJob = async (req: Request, res: Response) => {
  await createJobService(req, res)
};

export const getJob = async (req: Request, res: Response) => {
  await getSingleJobService(req, res)
};

export const getJobs = async (req: Request, res: Response) => {
  await getJobsService(req, res)
};

export const addRequirement = async (req: Request, res: Response) => {
  await addRequirementService(req, res)
};
export const removeRequirement = async (req: Request, res: Response) => {
  await removeRequirementService(req, res)
};

export const addRole = async (req: Request, res: Response) => {
  addRoleService(req, res)
};
export const removeRole = async (req: Request, res: Response) => {
  removeRoleService(req, res)
};

export const updateJob = async (req: Request, res: Response) => {
  await updateJobService(req, res)
};
export const deleteJob = async (req: Request, res: Response) => {
  await deleteJobService(req,res)
};



export default {
  createJob,
  getJob,
  getJobs,
  addRequirement,
  addRole,
  updateJob,
};
