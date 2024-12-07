export default class UserDTO {
  constructor(
    readonly names: string,
    readonly surnames: string,
    readonly email: string,
    readonly cellphone: string,
    readonly office: string,
    readonly role: string
  ) {}
}