import jwt from 'jsonwebtoken'
import { IUser } from '../models/User'

const secret = process.env.SECRET ?? 'secret'

const options = {
  expiresIn: '1d',
}

function generateToken(user: IUser) {
  const { _id, nickname, email, role, avatar } = user
  const token = jwt.sign({ _id, nickname, email, role, avatar }, secret, options)
  return token
}

function verifyToken(token: string) {
  return jwt.verify(token, secret)
}

export default {
  generateToken,
  verifyToken,
}
