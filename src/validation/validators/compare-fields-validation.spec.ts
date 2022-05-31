import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')
  return { sut }
}

describe('CompareFieldsValidation', () => {
  test('Should call CompareFieldsValidation with correct fields', () => {
    const { sut } = makeSut()
    const validate = jest.spyOn(sut, 'validate')

    sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(validate).toHaveBeenCalledWith({ field: 'any_value', fieldToCompare: 'any_value' })
  })

  test('Should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation pass', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
