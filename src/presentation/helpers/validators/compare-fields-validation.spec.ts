import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('password', 'passwordConfirmation')
  return { sut }
}

describe('CompareFieldsValidation', () => {
  test('Should call CompareFieldsValidation with correct fields', () => {
    const { sut } = makeSut()
    const validate = jest.spyOn(sut, 'validate')

    sut.validate({ password: 'any_password', passwordConfirmation: 'any_password' })
    expect(validate).toHaveBeenCalledWith({ password: 'any_password', passwordConfirmation: 'any_password' })
  })

  test('Should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ password: 'any_password', passwordConfirmation: 'wrong_password' })
    expect(error).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should not return if validation pass', () => {
    const { sut } = makeSut()
    const error = sut.validate({ password: 'password', passwordConfirmation: 'password' })
    expect(error).toBeFalsy()
  })

  // test('Should throw if EmailValidator throws', () => {
  //   const { sut, emailValidatorStub } = makeSut()
  //   jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
  //     throw new Error()
  //   })
  //   expect(sut.validate).toThrow()
  // })
})
