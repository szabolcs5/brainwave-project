import { IPagination } from '../@types/request'
import { FeedbackCreateDto } from '../dtos/incoming/FeedbackCreateDto'
import Feedback from '../models/Feedback'
import { transformQuery } from '../utils/PaginationHelper'
import { userService } from './UserService'

const defaults: IPagination = {
  page: 1,
  limit: 10,
  filter: '',
  sort: 'createdAt',
  isApproved: false,
  order: 'asc',
}

export const feedbackService = {
  addFeedback: async (feedback: FeedbackCreateDto, user_id: string) => {
    const user = await userService.findById(user_id)
    if (!user) throw new Error('User not found.')
    return new Feedback({
      ...feedback,
      from: {
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
      },
    }).save()
  },
  findFeedbacks: async (pageRequest: IPagination) => {
    const filters = transformQuery(pageRequest, defaults)
    const query = {
      $or: [
        { 'from.email': { $regex: filters.filter, $options: 'i' } },
        { 'from.nickname': { $regex: filters.filter, $options: 'i' } },
      ],
    }

    const [total, feedbacks] = await Promise.all([
      Feedback.countDocuments(query),
      Feedback.find(query)
        .sort(filters.sort)
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit),
    ])
    return {
      feedbacks,
      total,
    }
  },
  findById: async (feedbackId: string) => {
    return Feedback.findById(feedbackId)
  },
}
