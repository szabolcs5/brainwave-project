import { Router } from 'express'
import languageController from '../controllers/languageController'

export const languageRouter = Router()

languageRouter.get('/', languageController.listLanguages)
