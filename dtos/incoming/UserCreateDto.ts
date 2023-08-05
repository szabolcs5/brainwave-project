import { IsEmail, IsString, IsUrl, MinLength } from 'class-validator'
import { IsImageUrl } from '../../validators/IsImageUrl'
import { IsUserAlreadyExist } from '../../validators/IsUserAlreadyExists'

export class UserCreateDto {
  @IsString()
  firstname!: string

  @IsString()
  lastname!: string

  @IsString()
  nickname!: string

  @IsEmail()
  @IsUserAlreadyExist({ message: 'Email $value already exists. Choose another one.' })
  email!: string

  @IsString()
  @MinLength(6)
  password!: string

  @IsString()
  @IsUrl()
  @IsImageUrl({ message: 'Avatar must be a valid image URL.' })
  avatar!: string

  constructor(userCreateDto: UserCreateDto) {
    Object.assign(this, userCreateDto)
  }
}
