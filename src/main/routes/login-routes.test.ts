import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app).post('/api/signup')
        .send({
          name: 'Leonardo',
          email: 'leonardo@email.com',
          password: '1234',
          passwordConfirmation: '1234'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return a accessToken on success', async () => {
      const password = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'Leonardo',
        email: 'leonardo@email.com',
        password
      })
      await request(app).post('/api/login')
        .send({
          email: 'leonardo@email.com',
          password: '1234'
        })
        .expect(200)
    })
    test('Should return 401 when not authorized', async () => {
      await request(app).post('/api/login')
        .send({
          email: 'leonardo@email.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
