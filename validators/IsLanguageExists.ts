import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { languageService } from '../services/LanguageService'

@ValidatorConstraint({ async: true })
export class IsLanguageExistsConstraint implements ValidatorConstraintInterface {
  validate(language: string) {
    return languageService.findByName(language).then((selectedLanguage) => {
      if (selectedLanguage) return true
      return false
    })
  }
}

export function IsLanguageExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLanguageExistsConstraint,
    })
  }
}
