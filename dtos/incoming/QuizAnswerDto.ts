import { ArrayMinSize, IsArray, IsMongoId, IsString, ValidateNested } from 'class-validator'

export class Answer {
  @IsMongoId()
  _id: string

  @IsString()
  answer: string

  constructor(_id: string, answer: string) {
    this._id = _id
    this.answer = answer
  }
}

export class QuizAnswerDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  answers: Answer[]

  constructor(quizEntry: QuizAnswerDto) {
    this.answers = new Array<Answer>().concat(quizEntry.answers)
  }
}
