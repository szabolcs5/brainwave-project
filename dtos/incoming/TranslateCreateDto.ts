import { ArrayMinSize, IsArray, IsString } from 'class-validator'

export class TranslateCreateDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  text: string[]

  @IsString()
  target_lang: string

  constructor(translateCreateDto: TranslateCreateDto) {
    this.text = translateCreateDto.text
    this.target_lang = translateCreateDto.target_lang
  }
}
