import { Router } from 'express'
import { translateController } from '../controllers/translateController'
import { checkIfUserIsStudent } from '../middleware/student'

export const translateRouter = Router()

translateRouter.post('/', checkIfUserIsStudent, translateController.translate)
