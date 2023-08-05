import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { IBodyRequest } from '../@types/request'
import { UserCreateDto } from '../dtos/incoming/UserCreateDto'
import { UserLoginDto } from '../dtos/incoming/UserLoginDto'
import { LoginDto } from '../dtos/outgoing/LoginDto'
import { UserReducedDto } from '../dtos/outgoing/UserReducedDto'
import { errorHandler } from '../errors'
import { channelService } from '../services/ChannelService'
import { userService } from '../services/UserService'

async function register(req: IBodyRequest<UserCreateDto>, res: Response, next: NextFunction) {
  try {
    const userCreateDto = new UserCreateDto(req.body)
    const errors = await validate(userCreateDto)
    if (errors.length > 0) {
      next(errorHandler(422, res, errors))
      return
    }

    const user = await userService.register(userCreateDto)
    res.status(201).json(new UserReducedDto(user))
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function login(req: IBodyRequest<UserLoginDto>, res: Response, next: NextFunction) {
  try {
    const userLoginDto = new UserLoginDto(req.body)
    const errors = await validate(userLoginDto)
    if (errors.length > 0) {
      next(errorHandler(422, res, errors))
      return
    }

    const userFromDb = await userService.findByEmail(userLoginDto.email)
    if (!userFromDb) {
      next(errorHandler(401, res, 'Invalid credentials'))
      return
    }

    const token = await userService.login(userLoginDto, userFromDb)
    if (!token) {
      next(errorHandler(401, res, 'Invalid credentials'))
      return
    }

    const channels = await channelService.find()
    if (!channels) {
      next(errorHandler(401, res, 'Invalid credentials'))
      return
    }

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV !== 'development',
    })

    return res.json({
      token,
      user: new LoginDto(userFromDb, channels),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token')
    res.locals.payload = undefined
    return res.json({
      message: 'Logout successful',
      status: 200,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export const authController = {
  register,
  login,
  logout,
}
