export default class CreateUserDto {
  constructor(
    readonly id: string,
    readonly names: string,
    readonly surnames: string,
    readonly dni: string,
    readonly cellphone: string,
    readonly email: string,
    readonly office: number,
    readonly role: number
  ){}
}