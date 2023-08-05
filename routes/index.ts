import { Router } from 'express'
import { checkIfUserIsAdmin } from '../middleware/admin'
import { decodeToken, isTokenValid } from '../middleware/auth'
import { fallbackRouter } from '../middleware/fallbackRouter'
import { adminRouter } from './adminRouter'
import { authRouter } from './authRouter'
import { classroomRouter } from './classroomRouter'
import { feedbackRouter } from './feedbackRouter'
import { languageRouter } from './languageRouter'
import { messageRouter } from './messageRouter'
import { profileRouter } from './profileRouter'
import { translateRouter } from './translateRouter'
import { userRouter } from './userRouter'

const router = Router()

router.use(authRouter)
router.use(decodeToken)
router.use(isTokenValid)

// Only authenticated users can access the routes below
router.use('/languages', languageRouter)
router.use('/users', userRouter)
router.use('/profile', profileRouter)
router.use('/classrooms', classroomRouter)
router.use('/feedbacks', feedbackRouter)
router.use('/translate', translateRouter)
router.use('/messages', messageRouter)

router.use(checkIfUserIsAdmin)
// Only authenticated admin can access the routes below
router.use('/admin', adminRouter)

router.use(fallbackRouter)

export default router
