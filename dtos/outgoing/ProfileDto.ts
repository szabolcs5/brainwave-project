import { IBook } from '../../models/Book'
import { ILanguageLevel } from '../../models/Language'
import { ISeries } from '../../models/Series'
import { Roles } from '../../utils/Constants'

export class ProfileDto {
  _id: string

  description: string

  firstname: string

  lastname: string

  nickname: string

  avatar: string

  spotify_embedded_iframe: string

  languages: ILanguageLevel[]

  role: Roles

  current_book: IBook

  current_tv_show: ISeries

  constructor(profileDto: ProfileDto) {
    this._id = profileDto._id
    this.description = profileDto.description
    this.firstname = profileDto.firstname
    this.lastname = profileDto.lastname
    this.nickname = profileDto.nickname
    this.avatar = profileDto.avatar
    this.spotify_embedded_iframe = profileDto.spotify_embedded_iframe
    this.languages = profileDto.languages
    this.role = profileDto.role
    this.current_book = profileDto.current_book
    this.current_tv_show = profileDto.current_tv_show
  }
}
