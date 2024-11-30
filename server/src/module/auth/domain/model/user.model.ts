import Office from "./office.model";
import Role from "./role.model";
import UserData from "./user-data.model";
import UUID from "src/module/shared/domain/value-object/uuid.value-object";
import Name from "src/module/shared/domain/value-object/name.value-object";

export default class User {
  //#region Atributtes
  readonly #id: UUID;
  readonly #name: Name;
  readonly #password: string;
  //#endregion
  //#region References
  #userData?: UserData;
  #office?: Office;
  #role?: Role;
  //#endregion
  
  constructor(id: string, name: string, password: string) {
    this.#id = new UUID(id);
    this.#name = new Name(name);
    this.#password = password;
  }
  //#region Methods
  getId(): string {
    return this.#id.getValue();
  }

  getName(): string {
    return this.#name.getValue();
  }

  getPassword(): string {
    return this.#password;
  }

  setUserData(userData: UserData): void {
    this.#userData = userData;
  }

  getUserData(): UserData {
    return this.#userData;
  }

  setOffice(office: Office): void {
    this.#office = office;
  }

  getOffice(): Office {
    return this.#office;
  }

  setRole(role: Role): void {
    this.#role = role;
  }

  getRole(): Role {
    return this.#role;
  }
  //#endregion
}