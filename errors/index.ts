import { ValidationError } from 'class-validator'
import { Response } from 'express'

const errorMap = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Something went wrong',
}

type ErrorMessage = ValidationError[] | Record<string, unknown> | string

export const errorHandler = (status: number, res: Response, message?: ErrorMessage) => {
  return res.status(status).json({
    status,
    message: message ? message : errorMap[status as keyof typeof errorMap],
  })
}
