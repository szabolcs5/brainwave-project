import { NextFunction, Request, Response } from 'express'
import JwtHelper from '../utils/JwtHelper'

export function decodeToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token
  if (token) {
    try {
      res.locals.payload = JwtHelper.verifyToken(token)
    } catch (error) {
      res.clearCookie('token')
    }
  }
  next()
}

export function isTokenValid(_req: Request, res: Response, next: NextFunction) {
  if (res.locals.payload) {
    return next()
  }
  return res.status(401).json({
    status: 401,
    message: 'Unauthorized',
  })
}
