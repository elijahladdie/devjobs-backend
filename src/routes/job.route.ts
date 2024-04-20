// routes/jobRoutes.ts

import express from 'express';
import {
    createJob,
    getJob,
    getJobs,
    addRequirement,
    addRole,
    updateJob,
    deleteJob,
    removeRole,
    removeRequirement
} from '../controllers/job.controller';
import isAuthenticated from '../utils/verifyToken';

const jobRouter = express.Router();

// Create a new job
jobRouter.post('/create', isAuthenticated, createJob);

// Get a specific job by ID
jobRouter.get('/:id', getJob);

// Get all jobs
jobRouter.get('/', getJobs);

// Update a job
jobRouter.patch('/:id/update', isAuthenticated, updateJob);
// Delete a job
jobRouter.delete('/:id/delete', isAuthenticated, deleteJob);

// Role routes
jobRouter.post('/:id/roles', isAuthenticated, addRole);
jobRouter.delete('/:jobId/roles/:id/remove', isAuthenticated, removeRole);
// /2/roles/1/remove
// Add a requirement to a job
jobRouter.post('/:id/requirement', isAuthenticated, addRequirement);
jobRouter.delete('/:jobId/requirement/:id/remove', isAuthenticated, removeRequirement);



export default jobRouter;

