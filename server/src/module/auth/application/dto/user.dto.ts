export default class UserDTO {
  constructor(
    readonly id: string,
    readonly names: string,
    readonly surnames: string,
    readonly email: string
  ) {}
}