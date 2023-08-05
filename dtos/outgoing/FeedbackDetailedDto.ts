import { IFeedback } from '../../models/Feedback'
import { IReducedUser } from '../../models/User'

export class FeedbackDetailedDto {
  _id: string

  title: string

  text: string

  from: IReducedUser

  createdAt: Date

  rate: number

  constructor(feedback: IFeedback) {
    this._id = feedback._id
    this.title = feedback.title
    this.text = feedback.text
    this.from = feedback.from
    this.createdAt = feedback.createdAt
    this.rate = feedback.rate
  }
}
