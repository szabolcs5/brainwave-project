import { validate } from 'class-validator'
import { NextFunction, Response } from 'express'
import { IBodyRequest } from '../@types/request'
import { TranslateCreateDto } from '../dtos/incoming/TranslateCreateDto'
import { errorHandler } from '../errors'
import { translateService } from '../services/TranslateService'

async function translate(req: IBodyRequest<TranslateCreateDto>, res: Response, next: NextFunction) {
  try {
    const translateCreateDto = new TranslateCreateDto(req.body)
    const errors = await validate(translateCreateDto)
    if (errors.length > 0) {
      return next(errorHandler(422, res, errors))
    }
    const result = await translateService.translate(translateCreateDto)
    return res.json(result.data)
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export const translateController = {
  translate,
}
