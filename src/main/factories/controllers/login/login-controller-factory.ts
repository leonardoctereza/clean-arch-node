import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const validation = makeLoginValidation()
  const dbAuthetication = makeDbAuthentication()
  const controller = new LoginController(dbAuthetication, validation)
  return makeLogControllerDecorator(controller)
}
