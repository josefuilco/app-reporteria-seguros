import Cellphone from "src/core/domain/value-object/cellphone.value-object";
import DNI from "src/core/domain/value-object/dni.value-object";
import Email from "src/core/domain/value-object/email.value-object";
import Name from "src/core/domain/value-object/name.value-object";
import Surname from "src/core/domain/value-object/surname.value-object";

export default class UserData {
  //#region Atributtes
  readonly #id: number;
  readonly #names: Name;
  readonly #surnames: Surname;
  readonly #dni: DNI;
  readonly #cellphone: Cellphone;
  readonly #email: Email;
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
    this.#names = new Name(names);
    this.#surnames = new Surname(surnames);
    this.#dni = new DNI(dni);
    this.#cellphone = new Cellphone(cellphone);
    this.#email = new Email(email);
  }
  //#region Methods
  getId(): number {
    return this.#id;
  }

  getNames(): string {
    return this.#names.getValue();
  }

  getSurnames(): string {
    return this.#surnames.getValue();
  }

  getDni(): string {
    return this.#dni.getValue();
  }

  getEmail(): string {
    return this.#email.getValue();
  }

  getCellphone(): string {
    return this.#cellphone.getValue();
  }
  //#endregion
}