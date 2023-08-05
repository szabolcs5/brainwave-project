import { IPagination } from '../@types/request'
import Message from '../models/Message'
import { transformQuery } from '../utils/PaginationHelper'

const defaults: IPagination = {
  page: 1,
  limit: 10,
  filter: '',
  sort: 'createdAt',
  isApproved: false,
  order: 'desc',
}

export const messageService = {
  getMessages: async (chat_id: string, pageRequest: IPagination) => {
    const filters = transformQuery(pageRequest, defaults)
    const query = {
      $and: [
        { chat_id },
        {
          $or: [
            { message: { $regex: filters.filter, $options: 'i' } },
            { 'from.nickname': { $regex: filters.filter, $options: 'i' } },
          ],
        },
      ],
    }
    const sort = {
      [filters.sort]: filters.order,
    }
    const [total, messages] = await Promise.all([
      Message.countDocuments(query),
      Message.find(query)
        .sort(sort)
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit),
    ])
    return {
      messages,
      total,
    }
  },
}
