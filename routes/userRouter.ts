import { Router } from 'express'
import userController from '../controllers/userController'
import { checkIfUserIsTeacher } from '../middleware/teacher'

export const userRouter = Router()

userRouter.patch('/proofs', checkIfUserIsTeacher, userController.addProof)
userRouter.patch('/', userController.assignUser)
