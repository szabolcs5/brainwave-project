import { validate } from 'class-validator'
import { NextFunction, Response } from 'express'
import { IBodyRequest } from '../@types/request'
import { TeacherProofDto } from '../dtos/incoming/TeacherProofDto'
import { UserAssignDto } from '../dtos/incoming/UserAssignDto'
import { UserReducedDto } from '../dtos/outgoing/UserReducedDto'
import { errorHandler } from '../errors'
import { IUser } from '../models/User'
import { userService } from '../services/UserService'
import { Roles } from '../utils/Constants'
import JwtHelper from '../utils/JwtHelper'
async function assignUser(req: IBodyRequest<UserAssignDto>, res: Response, next: NextFunction) {
  const { role, languages } = req.body
  const { _id } = res.locals.payload

  try {
    const errors = await validate(new UserAssignDto({ role, languages }))
    if (errors.length > 0) return next(errorHandler(422, res, errors))

    const newUser: Partial<IUser> = {
      role,
      languages,
    }
    if (role === Roles.Student) newUser.confirmed_at = new Date()

    let user = await userService.findById(_id)
    if (user?.role !== undefined) {
      return next(errorHandler(422, res, 'User already assigned'))
    }

    user = (await userService.updateById(_id, newUser)) as IUser

    const newToken = JwtHelper.generateToken(user)
    res.cookie('token', newToken, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV !== 'development',
    })
    return res.json({
      status: 200,
      token: newToken,
      message: new UserReducedDto(user),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function addProof(req: IBodyRequest<TeacherProofDto>, res: Response, next: NextFunction) {
  const { _id } = res.locals.payload
  const { proofs } = req.body
  const errors = await validate(new TeacherProofDto({ proofs }))
  if (errors.length > 0) return next(errorHandler(422, res, errors))
  try {
    userService.updateById(_id, { proofs })
    return res.json({
      status: 200,
      message: 'Proofs added successfully',
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}
export default {
  assignUser,
  addProof,
}
