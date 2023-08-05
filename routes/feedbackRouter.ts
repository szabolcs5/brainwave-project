import { Router } from 'express'
import feedbackController from '../controllers/feedbackController'
import { checkIfUserIsAdmin } from '../middleware/admin'

export const feedbackRouter = Router()

feedbackRouter.post('/', feedbackController.addFeedback)
feedbackRouter.get('/', checkIfUserIsAdmin, feedbackController.getFeedbacks)
feedbackRouter.get('/:id', checkIfUserIsAdmin, feedbackController.getFeedback)
