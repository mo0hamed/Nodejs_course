import { Router } from 'express'
import {
  addJob,
  updateJob,
  deleteJob,
  getAllJobs
} from '../controllers/job.controller.js'
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js'

const jobRouter = Router()

jobRouter.post('/', authMiddleware, roleMiddleware(['Company_HR']), addJob)
jobRouter.put('/:jobId', authMiddleware, roleMiddleware(['Company_HR']), updateJob)
jobRouter.delete('/:jobId', authMiddleware, roleMiddleware(['Company_HR']), deleteJob)
jobRouter.get('/', getAllJobs)


export default jobRouter
