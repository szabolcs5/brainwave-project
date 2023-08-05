import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint()
export class IsSpotifyUrlConstraint implements ValidatorConstraintInterface {
  validate(iframe: string) {
    const regex =
      /^<iframe[^>]*src="https:\/\/open\.spotify\.com\/embed\/(album|playlist|track)\/[A-Za-z0-9?=&;_%+-]+".*><\/iframe>$/
    return regex.test(iframe)
  }
}

export function IsSpotifyUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSpotifyUrlConstraint,
    })
  }
}
