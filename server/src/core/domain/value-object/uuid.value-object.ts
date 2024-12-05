export default class UUID {
  static #regex: RegExp = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
    this.checkUUID();
  }

  private checkUUID(): void {
    if (!UUID.#regex.test(this.#value) || this.#value.length !== 36)
      throw new Error(`UUID Invalido: ${ this.#value }`);
  }

  getValue(): string {
    return this.#value;
  }
}