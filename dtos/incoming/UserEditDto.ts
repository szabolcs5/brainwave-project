import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { IsImageUrl } from '../../validators/IsImageUrl'
import { IsSpotifyUrl } from '../../validators/IsSpotifyUrl'

export class Book {
  @IsString()
  title!: string

  @IsString()
  author!: string

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsInt()
  percentage!: number

  constructor(book: Book) {
    Object.assign(this, book)
  }
}

export class Series {
  @IsString()
  title!: string

  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(100)
  percentage!: number

  constructor(series: Series) {
    Object.assign(this, series)
  }
}

export class UserEditDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  firstname?: string

  @IsString()
  @IsOptional()
  lastname?: string

  @IsString()
  @IsOptional()
  nickname?: string

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string

  @IsString()
  @MinLength(6)
  @ValidateIf((o) => o.password !== undefined)
  newPassword!: string

  @IsString()
  @IsUrl()
  @IsImageUrl({ message: 'Avatar must be a valid image URL.' })
  @IsOptional()
  avatar?: string

  @IsOptional()
  @IsString()
  @IsSpotifyUrl({ message: 'Spotify embedded iframe must be a valid Spotify URL.' })
  spotify_embedded_iframe?: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  current_book?: Book

  @IsOptional()
  @IsObject()
  @ValidateNested()
  current_tv_show?: Series

  constructor(userEditDto: UserEditDto) {
    Object.assign(this, userEditDto)
    if (userEditDto.current_book && Object.keys(userEditDto.current_book).length !== 0)
      this.current_book = new Book(userEditDto.current_book)
    if (userEditDto.current_tv_show && Object.keys(userEditDto.current_tv_show).length !== 0)
      this.current_tv_show = new Series(userEditDto.current_tv_show)
  }
}
