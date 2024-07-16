import { Router } from 'express'
import {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyData,
  searchCompanyByName,
  getApplicationsForJob
} from '../controllers/company.controller.js'
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js'

const companyRouter = Router()

companyRouter.post('/', authMiddleware, roleMiddleware(['Company_HR']), addCompany)
companyRouter.put('/:companyId', authMiddleware, roleMiddleware(['Company_HR']), updateCompany)
companyRouter.delete('/:companyId', authMiddleware, roleMiddleware(['Company_HR']), deleteCompany)
companyRouter.get('/:companyId', authMiddleware, roleMiddleware(['Company_HR']), getCompanyData)
companyRouter.get('/search', authMiddleware, roleMiddleware(['Company_HR', 'User']), searchCompanyByName)
companyRouter.get('/applications/:jobId', authMiddleware, roleMiddleware(['Company_HR']), getApplicationsForJob)

export default companyRouter
