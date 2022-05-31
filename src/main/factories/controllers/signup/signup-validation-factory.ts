
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter'
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation
} from '../../../../presentation/helpers/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
