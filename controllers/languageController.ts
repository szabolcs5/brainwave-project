import { NextFunction, Request, Response } from 'express'
import { LanguageReducedDto } from '../dtos/outgoing/LanguageReducedDto'
import { errorHandler } from '../errors'
import { languageService } from '../services/LanguageService'

async function listLanguages(req: Request, res: Response, next: NextFunction) {
  try {
    const languages = await languageService.listLanguages()
    const reducedLanguages: LanguageReducedDto[] = languages.map((language) => new LanguageReducedDto(language))

    return res.json(reducedLanguages)
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export default {
  listLanguages,
}
