import { Answer } from '../dtos/incoming/QuizAnswerDto'

export type KafkaSecurity = 'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl' | undefined

export interface IQuizMessage {
  quizId: string
  answers: Answer[]
  studentId: string
}
