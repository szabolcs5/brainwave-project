import { ArrayMinSize, ArrayNotEmpty, IsArray, IsString, ValidateNested } from 'class-validator'

export class QuizQuestionDto {
  @IsString()
  title: string

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @IsString({ each: true })
  answers: string[]

  @IsString()
  correctAnswer: string

  constructor(quizQuestionDto: QuizQuestionDto) {
    this.title = quizQuestionDto.title
    this.correctAnswer = quizQuestionDto.correctAnswer
    this.answers = quizQuestionDto.answers
  }
}

export class QuizCreateDto {
  @IsString()
  title!: string

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  questions!: QuizQuestionDto[]

  constructor(quizCreateDto: QuizCreateDto) {
    this.title = quizCreateDto.title
    this.questions = quizCreateDto.questions.map((questionDto) => new QuizQuestionDto(questionDto))
  }
}
