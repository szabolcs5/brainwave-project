import { instrument } from '@socket.io/admin-ui'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import { Server } from 'socket.io'
import { connectToDatabase } from './db'
import { initializeKafka } from './kafka/kafka'
import router from './routes'
import { addSocketMiddlewares, addSocketRoutes } from './routes/socketRoutes'
import { seedDatabase } from './utils/SeedDatabase'

config()
connectToDatabase()

const app = express()
const PORT = process.env.PORT || 8080
const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io', 'https://brainwave-4c20c.web.app'],
    credentials: true,
  },
})

instrument(io, {
  auth: false,
  mode: 'development',
})

// addAdapter()
addSocketMiddlewares()
addSocketRoutes()

app.use(cors({ origin: ['http://localhost:3000', 'https://brainwave-4c20c.web.app'], credentials: true }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', router)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  seedDatabase()
  initializeKafka()
})
