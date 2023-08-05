import { Router } from 'express'
import adminController from '../controllers/adminController'

export const adminRouter = Router()

adminRouter.patch('/teachers/:id', adminController.approveTeacher)
adminRouter.get('/students', adminController.getStudents)
adminRouter.get('/teachers', adminController.getTeachers)
adminRouter.delete('/users/:id', adminController.deleteUser)
adminRouter.post('/channels', adminController.createChannel)
