export class AuthDTO {
  constructor(
    readonly id: string,
    readonly office: number,
    readonly role: number
  ) {}
}