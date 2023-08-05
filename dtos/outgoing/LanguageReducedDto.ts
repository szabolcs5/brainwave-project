import { ILanguage } from '../../models/Language'

export class LanguageReducedDto {
  name: string

  abbreviation: string

  constructor(language: ILanguage) {
    this.name = language.name
    this.abbreviation = language.abbreviation
  }
}
