export default class Name {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
    this.checkName();
  }

  private checkName(): void {
    const length = this.#value.length;
    if (length <= 0 && length >= 30)
      throw new Error(`Nombre Invalido: ${ this.#value }`);
  }

  getValue(): string {
    return this.#value;
  }
}