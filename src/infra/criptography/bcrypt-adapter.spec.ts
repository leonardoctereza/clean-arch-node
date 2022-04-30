import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hashed')
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  const bcryptAdapterStub = new BcryptAdapter(salt)
  return bcryptAdapterStub
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  test('Should a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
