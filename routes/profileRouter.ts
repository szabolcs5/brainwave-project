import { Router } from 'express'
import profileController from '../controllers/profileController'

export const profileRouter = Router()

profileRouter.patch('/', profileController.updateProfile)
profileRouter.get('/', profileController.getMyProfile)
profileRouter.get('/:id', profileController.getUserProfile)
