import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class FeedbackCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  text: string

  @IsInt()
  @Min(1)
  @Max(5)
  rate: number

  constructor(feedback: FeedbackCreateDto) {
    this.title = feedback.title
    this.text = feedback.text
    this.rate = feedback.rate
  }
}
