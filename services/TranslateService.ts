import axios from 'axios'
import { TranslateCreateDto } from '../dtos/incoming/TranslateCreateDto'

export const translateService = {
  translate: async (translateCreateDto: TranslateCreateDto) => {
    return axios.post(process.env.DEEPL_URL ?? '', translateCreateDto, {
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    })
  },
}
