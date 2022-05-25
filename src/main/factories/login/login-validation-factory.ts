
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'
import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '../../../presentation/helpers/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
