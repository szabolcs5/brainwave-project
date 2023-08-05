import Language from '../models/Language'

export const languageService = {
  listLanguages: async () => {
    return Language.find()
  },
  findByName: async (name: string) => {
    return Language.find({ name })
  },
}
