import Classroom, { IClassroom, ICreateClassroom } from '../models/Classroom'

export const classroomService = {
  find: async () => {
    return Classroom.find()
  },
  findByCode: async (code: string) => {
    return Classroom.findOne({ joinCode: code })
  },
  findById: async (id: string) => {
    return Classroom.findById(id)
  },
  save: async (classroom: ICreateClassroom) => {
    return Classroom.create(classroom)
  },
  updateById: async (id: string, classroom: Partial<IClassroom>) => {
    return Classroom.findByIdAndUpdate(id, classroom, { new: true })
  },
  lockClassroom: async (id: string) => {
    return Classroom.findByIdAndUpdate(id, { isLocked: true }, { new: true })
  },
}
