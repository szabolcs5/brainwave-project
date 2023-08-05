import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { isValidObjectId } from 'mongoose'
import xss from 'xss'
import { IBodyRequest } from '../@types/request'
import { UserEditDto } from '../dtos/incoming/UserEditDto'
import { ProfileDto } from '../dtos/outgoing/ProfileDto'
import { errorHandler } from '../errors'
import { userService } from '../services/UserService'
import HashHelper from '../utils/HashHelper'

async function updateProfile(req: IBodyRequest<UserEditDto>, res: Response, next: NextFunction) {
  const userEditDto = new UserEditDto(req.body)

  const errors = await validate(userEditDto)
  if (errors.length > 0) {
    return next(errorHandler(422, res, errors))
  }
  try {
    const newUser = new UserEditDto(req.body)
    const { _id } = res.locals.payload
    const user = await userService.findById(_id)
    if (!user) throw new Error('User not found.')
    if (newUser.password) {
      const isPasswordMatched = await HashHelper.compare(newUser.password, user.password)
      if (!isPasswordMatched) {
        return next(errorHandler(401, res, 'Invalid password.'))
      }

      newUser.password = await HashHelper.hash(newUser.newPassword)
    }
    type UserEditDtoKeys = keyof UserEditDto
    const mappedUser = Object.entries(newUser).reduce((acc, [key, value]) => {
      if (value) {
        acc[key as UserEditDtoKeys] = value
      }
      return acc
    }, {} as Partial<UserEditDto>)
    if (mappedUser.spotify_embedded_iframe) {
      const iframe = mappedUser.spotify_embedded_iframe?.replace(/\\/g, '')
      mappedUser.spotify_embedded_iframe = xss(iframe)
    }

    if (!isValidObjectId(_id)) return next(errorHandler(400, res))

    const updatedUser = await userService.updateById(_id, mappedUser)
    if (!updatedUser) return next(errorHandler(404, res, 'User not found.'))

    return res.json({
      status: 200,
      message: new ProfileDto(updatedUser),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getMyProfile(req: Request, res: Response, next: NextFunction) {
  const { _id } = res.locals.payload
  try {
    const user = await userService.findById(_id)
    if (!user) throw new Error('User not found.')
    return res.json({
      status: 200,
      message: new ProfileDto(user),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id
  try {
    const user = await userService.findById(userId)
    if (!user) throw new Error('User not found.')
    return res.json({
      status: 200,
      message: new ProfileDto(user),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export default {
  updateProfile,
  getMyProfile,
  getUserProfile,
}
