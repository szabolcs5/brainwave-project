import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { checkDocumentUrl } from '../utils/UrlHelper'

@ValidatorConstraint({ async: true })
export class IsDocumentUrlConstraint implements ValidatorConstraintInterface {
  validate(url: string) {
    return checkDocumentUrl(url).then((isValid) => isValid)
  }
}

export function IsDocumentUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDocumentUrlConstraint,
    })
  }
}
