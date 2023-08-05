import { IPagination } from '../@types/request'
import { UserCreateDto } from '../dtos/incoming/UserCreateDto'
import { UserLoginDto } from '../dtos/incoming/UserLoginDto'
import { IUser, default as User, default as userModel } from '../models/User'
import { Roles } from '../utils/Constants'
import HashHelper from '../utils/HashHelper'
import JwtHelper from '../utils/JwtHelper'
import { transformQuery } from '../utils/PaginationHelper'

const defaults: IPagination = {
  page: 1,
  limit: 10,
  filter: '',
  sort: 'lastname',
  order: 'asc',
  isApproved: false,
}

export const userService = {
  findById: async (_id: string) => {
    return userModel.findById(_id)
  },
  findByEmail: async (email: string) => {
    return userModel.findOne({ email })
  },
  register: async (user: UserCreateDto) => {
    user.password = await HashHelper.hash(user.password)
    return userModel.create(user)
  },
  login: async (user: UserLoginDto, userFromDb: IUser) => {
    const isHashMatched = await HashHelper.compare(user.password, userFromDb.password)
    if (!isHashMatched) {
      return null
    }
    return JwtHelper.generateToken(userFromDb)
  },
  updateById: async (_id: string, user: Partial<IUser>) => {
    return userModel.findOneAndUpdate({ _id }, user, { new: true })
  },
  deleteUser: async (_id: string) => {
    return userModel.findByIdAndDelete(_id)
  },
  isApprovedQuery: (role: Roles, isApproved: boolean) => {
    if (role !== Roles.Teacher) return {}
    return { confirmed_at: isApproved ? { $ne: null } : null }
  },
  findUserByRole: async (pageRequest: IPagination, role: Roles) => {
    const filters = transformQuery(pageRequest, defaults)
    const isApprovedQuery = userService.isApprovedQuery(role, filters.isApproved)
    const query = {
      $and: [
        { role },
        isApprovedQuery,
        {
          $or: [
            { firstname: { $regex: filters.filter, $options: 'i' } },
            { lastname: { $regex: filters.filter, $options: 'i' } },
            { email: { $regex: filters.filter, $options: 'i' } },
            { nickname: { $regex: filters.filter, $options: 'i' } },
          ],
        },
      ],
    }
    const sort = {
      [filters.sort]: filters.order,
    }
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .sort(sort)
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit),
    ])
    return {
      users,
      total,
    }
  },
}
