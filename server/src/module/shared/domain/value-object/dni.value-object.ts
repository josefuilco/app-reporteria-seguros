import DOI from "./doi.value-object";

export default class DNI extends DOI {
  constructor(value: string) {
    super(value);
  }

  checkDOI(): void {
    if (this.value.length !== 8)
      throw new Error(`DNI Invalido: ${ this.value }`);
  }
}