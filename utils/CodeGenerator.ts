import Classroom from '../models/Classroom'

async function checkIfCodeExists(code: string) {
  const classroom = await Classroom.find({ joinCode: code })
  return classroom
}

export async function generateJoinCode() {
  let randomString = Math.random().toString(36).substring(0, 4).toUpperCase()
  let timestamp = Date.now().toString().substring(4)
  let code = randomString + timestamp
  let exists = await checkIfCodeExists(code)
  while (exists.length > 0) {
    randomString = Math.random().toString(36).substring(0, 4).toUpperCase()
    timestamp = Date.now().toString().substring(4)
    code = randomString + timestamp
    exists = await checkIfCodeExists(code)
  }
  return code
}
