import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { FeedbackCreateDto } from '../dtos/incoming/FeedbackCreateDto'
import { FeedbackDetailedDto } from '../dtos/outgoing/FeedbackDetailedDto'
import { FeedbackReducedDto } from '../dtos/outgoing/FeedbackReducedDto'
import { errorHandler } from '../errors'
import { feedbackService } from '../services/FeedbackService'

async function getFeedbacks(req: Request, res: Response) {
  const queryParams = {
    page: parseInt(req.query.page as string),
    limit: parseInt(req.query.limit as string),
    filter: req.query.filter as string,
    sort: req.query.sort as string,
    isApproved: false,
    order: 'asc' as 'asc' | 'desc',
  }
  const feedbacksWithCount = await feedbackService.findFeedbacks(queryParams)
  const feedbacks = feedbacksWithCount.feedbacks.map((feedback) => new FeedbackReducedDto(feedback))
  res.json({
    data: feedbacks,
    total: feedbacksWithCount.total,
  })
}

async function addFeedback(req: Request, res: Response, next: NextFunction) {
  const feedback = new FeedbackCreateDto(req.body)
  const errors = await validate(feedback)
  if (errors.length > 0) {
    return next(errorHandler(422, res, errors))
  }
  const user_id = res.locals.payload._id
  try {
    const savedFeedback = await feedbackService.addFeedback(feedback, user_id)
    return res.status(201).json(new FeedbackReducedDto(savedFeedback))
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getFeedback(req: Request, res: Response, next: NextFunction) {
  const feedback_id = req.params.id

  if (!isValidObjectId(feedback_id)) {
    return next(errorHandler(400, res, 'Invalid feedback id.'))
  }

  try {
    const feedback = await feedbackService.findById(feedback_id)
    if (!feedback) {
      return next(errorHandler(404, res, 'Feedback not found.'))
    }
    return res.json(new FeedbackDetailedDto(feedback))
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export default {
  getFeedbacks,
  addFeedback,
  getFeedback,
}
