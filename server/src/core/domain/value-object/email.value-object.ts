export default class Email {
  readonly #value: string;
  static #regex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  constructor(value: string) {
    this.#value = value;
    this.checkEmail();
  }

  private checkEmail(): void {
    if (!Email.#regex.test(this.#value))
      throw new Error(`Correo Invalido: ${ this.#value }`);
  }

  getValue(): string {
    return this.#value;
  }
}