import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint({ async: true })
export class IsArrayUniqueConstraint implements ValidatorConstraintInterface {
  validate(array: unknown[]) {
    const combinedObject = array.map((item) => JSON.stringify(item))
    return new Set(combinedObject).size === combinedObject.length
  }
}

export function IsArrayUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayUniqueConstraint,
    })
  }
}
