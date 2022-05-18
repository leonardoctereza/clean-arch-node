import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logErrorCollection = await MongoHelper.getCollection('errors')
    await logErrorCollection.insertOne({ stack, date: new Date() })
  }
}