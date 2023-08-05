import { IFeedback } from '../../models/Feedback'
import { IReducedUser } from '../../models/User'

export class FeedbackReducedDto {
  _id: string

  title: string

  createdAt: Date

  rate: number

  from: IReducedUser

  constructor(feedback: IFeedback) {
    this._id = feedback._id
    this.title = feedback.title
    this.rate = feedback.rate
    this.createdAt = feedback.createdAt
    this.from = feedback.from
  }
}
