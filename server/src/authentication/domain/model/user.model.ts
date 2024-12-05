import UserData from "./user-data.model";
import UUID from "src/core/domain/value-object/uuid.value-object";
import Name from "src/core/domain/value-object/name.value-object";
import Password from "../value-object/password.value-object";

export default class User {
  //#region Atributtes
  readonly #id: UUID;
  #name: Name;
  #password: Password;
  #officeId?: number;
  #roleId?: number;
  //#endregion
  //#region References
  #userData?: UserData;
  //#endregion
  
  constructor(id: string, name: string, password: string) {
    this.#id = new UUID(id);
    this.#name = new Name(name);
    this.#password = new Password(password);
  }
  //#region Methods
  getId(): string {
    return this.#id.getValue();
  }

  setName(nickname: string): void {
    this.#name = new Name(nickname);
  }

  getName(): string {
    return this.#name.getValue();
  }

  setPassword(password: string): void {
    this.#password = new Password(password);
  }

  getPassword(): string {
    return this.#password.getValue();
  }

  setOfficeId(officeId: number): void {
    this.#officeId = officeId;
  }

  getOfficeId(): number {
    return this.#officeId;
  }

  setRoleId(roleId: number): void {
    this.#roleId = roleId;
  }

  getRoleId(): number {
    return this.#roleId;
  }

  setUserData(userData: UserData): void {
    this.#userData = userData;
  }

  getUserData(): UserData {
    return this.#userData;
  }
  //#endregion
}