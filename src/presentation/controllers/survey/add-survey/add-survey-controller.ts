import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly addSurvey: AddSurvey, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body
      await this.addSurvey.add({ question, answers })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
