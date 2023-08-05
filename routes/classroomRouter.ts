import { Router } from 'express'
import studentController from '../controllers/studentController'
import { teacherController } from '../controllers/teacherController'
import { classroomMember } from '../middleware/classroomMember'
import { quizExists } from '../middleware/quizExists'
import { checkIfUserIsStudent } from '../middleware/student'
import { checkIfUserIsConfirmedTeacher } from '../middleware/teacher'

export const classroomRouter = Router()

classroomRouter.post('/', checkIfUserIsConfirmedTeacher, teacherController.createClassroom)
classroomRouter.put('/:id', checkIfUserIsConfirmedTeacher, teacherController.lockClassroom)
classroomRouter.post('/:code', checkIfUserIsStudent, studentController.joinClassroom)
classroomRouter.post('/:id/quizzes', checkIfUserIsConfirmedTeacher, classroomMember, teacherController.createQuiz)
classroomRouter.get('/:id/quizzes', classroomMember, teacherController.getQuizzes)
classroomRouter.get('/:id/quizzes/:quizId', classroomMember, quizExists, teacherController.getQuiz)
classroomRouter.get(
  '/:id/quizzes/:quizId/statistics',
  checkIfUserIsConfirmedTeacher,
  quizExists,
  teacherController.getQuizStatistics,
)
classroomRouter.post(
  '/:id/quizzes/:quizId',
  checkIfUserIsStudent,
  classroomMember,
  quizExists,
  studentController.submitQuiz,
)
classroomRouter.get(
  '/:id/quizzes/:quizId/entries',
  classroomMember,
  quizExists,
  checkIfUserIsStudent,
  studentController.getQuizEntries,
)
