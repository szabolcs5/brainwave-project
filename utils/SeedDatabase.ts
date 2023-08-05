import languageSeeder from '../seeders/languageSeeder'
import socketSeeder from '../seeders/socketSeeder'

export async function seedDatabase() {
  return Promise.all([languageSeeder(), socketSeeder()])
}
