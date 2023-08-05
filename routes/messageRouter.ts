import { Router } from 'express'
import messageController from '../controllers/messageController'

export const messageRouter = Router()

messageRouter.get('/:chat_id', messageController.getMessages)
