import { IsEmail, IsString, MinLength } from 'class-validator'

export class UserLoginDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(6)
  password!: string

  constructor(userLoginDto: UserLoginDto) {
    Object.assign(this, userLoginDto)
  }
}
