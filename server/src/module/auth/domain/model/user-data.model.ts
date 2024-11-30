export default class UserData {
  //#region Atributtes
  readonly #id: number;
  readonly #names: string;
  readonly #surnames: string;
  readonly #dni: string;
  readonly #cellphone: string;
  readonly #email: string;
  //#endregion
  constructor(
    id: number,
    names: string,
    surnames: string,
    dni: string,
    cellphone: string,
    email: string
  ) {
    this.#id = id;
    this.#names = names;
    this.#surnames = surnames;
    this.#dni = dni;
    this.#cellphone = cellphone;
    this.#email = email;
  }
  //#region Methods
  getId(): number {
    return this.#id;
  }
  //#endregion
}