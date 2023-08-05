import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { checkImageUrl } from '../utils/UrlHelper'

@ValidatorConstraint({ async: true })
export class IsImageUrlConstraint implements ValidatorConstraintInterface {
  validate(avatar: string) {
    return checkImageUrl(avatar).then((isValid) => isValid)
  }
}

export function IsImageUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsImageUrlConstraint,
    })
  }
}
