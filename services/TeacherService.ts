import { ILanguageLevel } from '../models/Language'

export const teacherService = {
  isTeacherEligible: (languages: ILanguageLevel[], { language, level }: ILanguageLevel) => {
    return languages.findIndex((lang) => lang.language === language && lang.level >= level)
  },
}
