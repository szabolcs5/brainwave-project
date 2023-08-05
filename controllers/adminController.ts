import { validate } from 'class-validator'
import { Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { isValidObjectId } from 'mongoose'
import { IBodyRequest, IQueryRequest } from '../@types/request'
import { ChannelCreateDto } from '../dtos/incoming/ChannelCreateDto'
import { ChannelDetailedDto } from '../dtos/outgoing/ChannelDetailedDto'
import { TeacherReducedDto } from '../dtos/outgoing/TeacherReducedDto'
import { UserReducedDto } from '../dtos/outgoing/UserReducedDto'
import { errorHandler } from '../errors'
import { channelService } from '../services/ChannelService'
import { userService } from '../services/UserService'
import { Roles } from '../utils/Constants'

async function getStudents(req: IQueryRequest, res: Response, next: NextFunction) {
  try {
    const queryParams = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      filter: req.query.filter,
      sort: req.query.sort,
      order: req.query.order as 'asc' | 'desc',
      isApproved: req.query.isApproved === 'true',
    }
    const studentsWithCount = await userService.findUserByRole(queryParams, Roles.Student)
    const students = studentsWithCount.users.map((student) => new UserReducedDto(student))
    res.json({
      data: students,
      total: studentsWithCount.total,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getTeachers(req: IQueryRequest, res: Response, next: NextFunction) {
  try {
    const queryParams = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      filter: req.query.filter,
      sort: req.query.sort,
      order: req.query.order as 'asc' | 'desc',
      isApproved: req.query.isApproved === 'true',
    }
    const teachersWithCount = await userService.findUserByRole(queryParams, Roles.Teacher)
    const teachers = teachersWithCount.users.map((teacher) => new TeacherReducedDto(teacher))
    return res.json({
      data: teachers,
      total: teachersWithCount.total,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function deleteUser(req: IQueryRequest, res: Response) {
  const { id } = req.params
  try {
    await userService.deleteUser(id)
  } catch (error) {
    console.warn(error)
  } finally {
    res.status(204)
  }
}

async function approveTeacher(req: IQueryRequest, res: Response, next: NextFunction) {
  const { id } = req.params
  try {
    if (!isValidObjectId(id)) return next(errorHandler(400, res))
    const teacher = await userService.findById(id)
    if (!teacher) {
      return next(errorHandler(404, res, 'Teacher not found'))
    }
    teacher.confirmed_at = new Date()
    await userService.updateById(id, teacher)
    return res.json(new TeacherReducedDto(teacher))
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function createChannel(req: IBodyRequest<ChannelCreateDto>, res: Response, next: NextFunction) {
  const { name, description } = req.body
  const errors = await validate(new ChannelCreateDto(name, description))
  if (errors.length > 0) {
    return next(errorHandler(422, res, errors))
  }
  try {
    const channel = await channelService.saveChannel(name, description)
    return res.json(new ChannelDetailedDto(channel))
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export default {
  getStudents,
  getTeachers,
  deleteUser,
  approveTeacher,
  createChannel,
}
