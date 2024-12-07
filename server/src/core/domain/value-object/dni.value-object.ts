import DOI from "./doi.value-object";

export default class DNI extends DOI {
  static #regex: RegExp = /^[0-9]{8}/;

  constructor(value: string) {
    super(value);
  }

  checkDOI(): void {
    if (!DNI.#regex.test(this.value) || this.value.length !== 8)
      throw new Error(`DNI Invalido: ${ this.value }`);
  }
}