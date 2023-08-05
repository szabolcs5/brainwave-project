import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { channelService } from '../services/ChannelService'

@ValidatorConstraint({ async: true })
export class IsChannelUniqueConstraint implements ValidatorConstraintInterface {
  validate(name: string) {
    return channelService.findByName(name).then((channel) => {
      if (channel) return false
      return true
    })
  }
}

export function IsChannelUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsChannelUniqueConstraint,
    })
  }
}
