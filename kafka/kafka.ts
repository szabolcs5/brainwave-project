import { Admin, Kafka, Producer } from 'kafkajs'
import { IQuizMessage } from '../@types/kafka'

let kafkaProducer: Producer
let adminClient: Admin

const quizTopic = 'quizzes'

export async function createTopic(topic: string) {
  await adminClient.createTopics({
    topics: [{ topic }],
  })
}

export async function initializeKafka() {
  const kafka = new Kafka({
    clientId: 'brainwave-api',
    brokers: [process.env.KAFKA_SERVER as string],
    ssl: true,
    sasl: {
      mechanism: process.env.KAFKA_MECHANISM as 'plain',
      username: process.env.KAFKA_USERNAME as string,
      password: process.env.KAFKA_PASSWORD as string,
    },
  })
  kafkaProducer = kafka.producer()
  await kafkaProducer.connect()
  adminClient = kafka.admin()
  await adminClient.connect()
  try {
    await createTopic(quizTopic)
  } catch (error) {
    console.warn('Quiz topic already exists')
  }
}

export async function publishMessage(message: IQuizMessage) {
  kafkaProducer.send({
    topic: quizTopic,
    messages: [{ value: JSON.stringify(message) }],
  })
}
