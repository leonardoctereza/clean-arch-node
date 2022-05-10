import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accoutnCollection = MongoHelper.getCollection('accounts')
    await accoutnCollection.deleteMany({})
  })
  test('Should return an account on success', async () => {
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
