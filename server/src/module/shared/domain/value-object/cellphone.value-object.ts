export default class Cellphone {
  readonly #value: string;
  static #regex: RegExp = /^[0-9]{9}/;

  constructor(value: string) {
    this.#value = value;
    this.checkCellphone();
  }

  private checkCellphone(): void {
    if (!Cellphone.#regex.test(this.#value))
      throw new Error(`Numero de Celular Invalido: ${ this.#value }`);
  }

  getValue(): string {
    return this.#value;
  }
}