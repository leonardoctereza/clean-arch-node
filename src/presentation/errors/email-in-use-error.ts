export class EmailInUseError extends Error {
  constructor () {
    super('The received email is already in unse')
    this.name = 'EmailInUseError'
  }
}
