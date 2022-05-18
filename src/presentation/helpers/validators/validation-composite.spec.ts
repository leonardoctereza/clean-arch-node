import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeFakeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeSut = (): SutTypes => {
  const validationStubs = [makeFakeValidation(), makeFakeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validations pass', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
