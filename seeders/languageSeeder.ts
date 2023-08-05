import Language from '../models/Language'

const languages = [
  {
    name: 'English',
    abbreviation: 'en',
  },
  {
    name: 'Spanish',
    abbreviation: 'es',
  },
  {
    name: 'French',
    abbreviation: 'fr',
  },
  {
    name: 'German',
    abbreviation: 'de',
  },
  {
    name: 'Italian',
    abbreviation: 'it',
  },
]

export default async function seedDatabase() {
  languages.forEach(async (language) => {
    await Language.findOneAndUpdate(language, language, { upsert: true })
  })
}
