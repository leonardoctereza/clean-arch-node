import { EmailInUseError } from '../../errors'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, Authentication } from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (private readonly authentication: Authentication, private readonly addAccount: AddAccount, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password, name } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
