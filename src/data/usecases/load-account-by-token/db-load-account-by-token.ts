import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'
import {
  LoadAccountByToken,
  LoadAccountByTokenRepository
} from './db-load-account-by-token-protocols'
export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) return null

    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    if (!account) return null

    return account
  }
}
