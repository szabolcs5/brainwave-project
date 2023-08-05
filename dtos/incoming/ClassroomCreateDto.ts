import { IsEnum, IsString } from 'class-validator'
import { Levels } from '../../utils/Constants'
import { IsLanguageExists } from '../../validators/IsLanguageExists'

export class ClassroomCreateDto {
  @IsEnum(Levels)
  level!: Levels

  @IsLanguageExists({ message: 'Language does not exist' })
  language!: string

  @IsString()
  description!: string

  constructor(classroom: ClassroomCreateDto) {
    Object.assign(this, classroom)
  }
}
