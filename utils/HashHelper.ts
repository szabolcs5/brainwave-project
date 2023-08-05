import bcrypt from 'bcryptjs'

const saltRounds = Number(process.env.SALT_ROUNDS) || 10

async function hash(password: string) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

async function compare(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export default {
  hash,
  compare,
}
