import { ArrayMinSize, IsArray, IsEnum, IsString, ValidateNested } from 'class-validator'
import { IncomingRoles, Levels } from '../../utils/Constants'
import { IsArrayUnique } from '../../validators/IsArrayUnique'
import { IsLanguageExists } from '../../validators/IsLanguageExists'

export class UserAssignDto {
  @IsEnum(IncomingRoles)
  role!: number

  @IsArray()
  @ArrayMinSize(1)
  @IsArrayUnique({ message: 'Language and level combination must be unique' })
  @ValidateNested({ each: true })
  languages!: LanguageLevelDto[]

  constructor({ role, languages }: UserAssignDto) {
    this.role = role
    this.languages = languages
  }
}

class LanguageLevelDto {
  @IsString()
  @IsLanguageExists()
  language!: string

  @IsEnum(Levels)
  level!: Levels
}
