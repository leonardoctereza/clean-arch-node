import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidaor: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidaor = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { email } = httpRequest.body

      const isValid = this.emailValidaor.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      return ok('')
    } catch (error) {
      return serverError(error)
    }
  }
}
