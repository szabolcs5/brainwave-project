import { NextFunction, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { IPagination, IQueryRequest } from '../@types/request'
import { MessageDetailedDto } from '../dtos/outgoing/MessageDetailedDto'
import { errorHandler } from '../errors'
import { messageService } from '../services/MessageService'

async function getMessages(req: IQueryRequest, res: Response, next: NextFunction) {
  try {
    const { chat_id } = req.params
    if (!isValidObjectId(chat_id)) return next(errorHandler(400, res))

    const queryParams: IPagination = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      filter: req.query.filter,
      sort: req.query.sort,
      order: req.query.order as 'asc' | 'desc',
      isApproved: false,
    }
    const messageWithCount = await messageService.getMessages(chat_id, queryParams)
    const messages = messageWithCount.messages.map((message) => new MessageDetailedDto(message))
    return res.json({
      data: messages,
      total: messageWithCount.total,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export default {
  getMessages,
}
