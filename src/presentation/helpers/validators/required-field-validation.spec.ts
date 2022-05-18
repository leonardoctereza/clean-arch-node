import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('field')
  return { sut }
}

describe('RequiredFieldValidation', () => {
  test('Should call RequiredFieldValidation with correct fields', () => {
    const { sut } = makeSut()
    const validate = jest.spyOn(sut, 'validate')

    sut.validate({ field: 'test' })
    expect(validate).toHaveBeenCalledWith({ field: 'test' })
  })

  test('Should return a MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ dontExist: 'test' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation pass', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'test' })
    expect(error).toBeFalsy()
  })
})
