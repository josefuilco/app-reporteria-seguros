export default class Password {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
    this.checkPassword();
  }

  private checkPassword(): void {
    const length = this.#value.length;
    if (length <= 0 || length >= 30)
      throw new Error(`Password Invalido: ${ this.#value }`);
  }

  getValue(): string {
    return this.#value;
  }
}