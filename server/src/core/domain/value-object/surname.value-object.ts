export default class Surname {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
    this.checkSurname();
  }

  private checkSurname(): void {
    const length = this.#value.length;
    if (length <= 0 && length >= 30)
      throw new Error(`Apellido Invalido: ${ this.#value }`);
  }

  getValue(): string {
    return this.#value;
  }
}